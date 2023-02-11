import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { authModalState } from "../components/atoms";
import { communityState } from "../components/atoms/communitiesAtom";
import { Post, postState, PostVote } from "../components/atoms/postsAtoms";
import { fireBaseAuth, fireBaseStorage, fireBaseStore } from "../service";

const usePosts = () => {
  const [user, loadingUser] = useAuthState(fireBaseAuth);
  const [postStateValue, setPostStateValue] = useRecoilState(postState);
  const setAuthModalState = useSetRecoilState(authModalState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const currentCommunity = useRecoilValue(communityState).currentCommunity;

  const getCommunityPostVotes = async (communityId: string) => {
 
    const postVotesQuery = query(
      collection(fireBaseStore, `users/${user?.uid}/postVotes`),
      where("communityId", "==", communityId)
    );
    const postVoteDocs = await getDocs(postVotesQuery);
    const postVotes = postVoteDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setPostStateValue((prev) => ({
      ...prev,
      postVotes: postVotes as PostVote[],
    }));

    // const unsubscribe = onSnapshot(postVotesQuery, (querySnapshot) => {
    //   const postVotes = querySnapshot.docs.map((postVote) => ({
    //     id: postVote.id,
    //     ...postVote.data(),
    //   }));

    // });

    // return () => unsubscribe();
  };

  const onSelectPost = (post: Post, postIdx: number) => {
    setPostStateValue((prev) => ({
      ...prev,
      // selectedPost: { ...post, postIdx },
      selectedPost : post
    }));
    router.push(`/r/${post.communityId}/comments/${post.id}`);
  };

  const onDeletePost = async ( post: Post): Promise<boolean> => {
  
    try {
      if (post.imageURL) {
        const imageRef = ref(fireBaseStorage, `posts/${post.id}/image`);
        await deleteObject(imageRef);
      }

      const postDocRef = doc(fireBaseStore, "posts", post.id);
      await deleteDoc(postDocRef);

      setPostStateValue((prev) => ({
        ...prev,
        posts: prev.posts.filter((item) => item.id !== post.id),
        // postsCache: {
        //   ...prev.postsCache,
        //   [post.communityId]: prev.postsCache[post.communityId]?.filter(
        //     (item) => item.id !== post.id
        //   ),
        // },
      }));

      return true;
    } catch (error) {
      console.log(`[ onDeletePost ]`, error);
      return false;
    }
  };

  const onVote = async (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    post: Post,
    vote: number,
    communityId: string
  ) => {
    event.stopPropagation();
    if (!user?.uid) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }

    const { voteStatus } = post;

    const existingVote = postStateValue.postVotes.find(
      (vote) => vote.postId === post.id
    );

    try {
      let voteChange = vote;
      const batch = writeBatch(fireBaseStore);

      const updatedPost = { ...post };
      const updatedPosts = [...postStateValue.posts];
      let updatedPostVotes = [...postStateValue.postVotes];

      if (!existingVote) {
        const postVoteRef = doc(
          collection(fireBaseStore, "users", `${user.uid}/postVotes`)
        );

        const newVote: PostVote = {
          id: postVoteRef.id,
          postId: post.id,
          communityId,
          voteValue: vote,
        };

        batch.set(postVoteRef, newVote);

        updatedPost.voteStatus = voteStatus + vote;
        updatedPostVotes = [...updatedPostVotes, newVote];
      } else {
        const postVoteRef = doc(
          fireBaseStore,
          "users",
          `${user.uid}/postVotes/${existingVote.id}`
        );

        if (existingVote.voteValue === vote) {
          voteChange *= -1;
          updatedPost.voteStatus = voteStatus - vote;
          updatedPostVotes = updatedPostVotes.filter(
            (vote) => vote.id !== existingVote.id
          );
          batch.delete(postVoteRef);
        } else {
          voteChange = 2 * vote;
          updatedPost.voteStatus = voteStatus + 2 * vote;
          const voteIdx = postStateValue.postVotes.findIndex(
            (vote) => vote.id === existingVote.id
          );
          if (voteIdx !== -1) {
            updatedPostVotes[voteIdx] = {
              ...existingVote,
              voteValue: vote,
            };
          }
          batch.update(postVoteRef, {
            voteValue: vote,
          });
        }
      }

      let updatedState = { ...postStateValue, postVotes: updatedPostVotes };

      const postIdx = postStateValue.posts.findIndex(
        (item) => item.id === post.id
      );

      updatedPosts[postIdx!] = updatedPost;
      updatedState = {
        ...updatedState,
        posts: updatedPosts,
        // postsCache: {
        //   ...updatedState.postsCache,
        //   [communityId]: updatedPosts,
        // },
      };

      if (updatedState.selectedPost) {
        updatedState = {
          ...updatedState,
          selectedPost: updatedPost,
        };
      }
      setPostStateValue(updatedState);
      const postRef = doc(fireBaseStore, "posts", post.id);
      batch.update(postRef, { voteStatus: voteStatus + voteChange });
      await batch.commit();
    } catch (error) {
      console.log(`[onVote error]`, error);
    }
  };

  useEffect(() => {
    if (!currentCommunity?.id) return;
    getCommunityPostVotes(currentCommunity.id);
  }, [currentCommunity, user]);

  useEffect(() => {
    if (!user) {
      setPostStateValue(prev => ({
        ...prev,
        postVotes : []
      }))
    }
  },[user])

  return {
    postStateValue,
    setPostStateValue,
    onSelectPost,
    onDeletePost,
    onVote,
    loading,
    setLoading
  };
};

export default usePosts;
