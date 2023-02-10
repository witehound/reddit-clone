import usePosts from "@/src/hooks/usePosts";
import { fireBaseAuth, fireBaseStore } from "@/src/service";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Community } from "../../atoms/communitiesAtom";
import { Post } from "../../atoms/postsAtoms";
import PostItem from "../PostItem/PostItem";

type PostsProps = {
  communityData?: Community;
  userId?: string;
  loadingUser?: boolean;
};

const Posts = ({ communityData }: PostsProps) => {
  const [user] = useAuthState(fireBaseAuth);
  const [loading, setLoading] = useState(false);
  const {
    postStateValue,
    setPostStateValue,
    onSelectPost,
    onDeletePost,
    onVote,
  } = usePosts();
  const getPosts = async () => {
    setLoading(true);
    try {
      const postsQuery = query(
        collection(fireBaseStore, "posts"),
        where("communityId", "==", communityData?.id!),
        orderBy("createdAt", "desc")
      );
      const postDocs = await getDocs(postsQuery);
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
        //   postsCache: {
        //     ...prev.postsCache,
        //     [communityData?.id!]: posts as Post[],
        //   },
        //   postUpdateRequired: false,
      }));
    } catch (error: any) {
      console.log("getPosts error", error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <>
      {postStateValue.posts.map((item) => (
        <PostItem
          post={item}
          key={item.id}
          userIsCreator={user?.uid == item.creatorId}
          userVoteValue={
            postStateValue.postVotes.find((vote) => vote.postId === item.id)
              ?.voteValue
          }
          onSelectPost={onSelectPost}
          onDeletePost={onDeletePost}
          onVote={onVote}
        />
      ))}
    </>
  );
};
export default Posts;
