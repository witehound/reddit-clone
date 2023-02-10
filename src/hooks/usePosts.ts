import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authModalState } from "../components/atoms";
import { Post, postState } from "../components/atoms/postsAtoms";
import { fireBaseAuth, fireBaseStorage, fireBaseStore } from "../service";

const usePosts = () => {
  const [user, loadingUser] = useAuthState(fireBaseAuth);
  const [postStateValue, setPostStateValue] = useRecoilState(postState);
  const setAuthModalState = useSetRecoilState(authModalState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const onSelectPost = () => { };
  
  const onDeletePost = async (post: Post): Promise<boolean> => {
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
      console.log( `[ onDeletePost ]`, error);
      return false;
    }
  };
  
  const onVote =async () => {};

  return {
    postStateValue,
    setPostStateValue,
    onSelectPost,
    onDeletePost,
    onVote,
  };
};

export default usePosts;
