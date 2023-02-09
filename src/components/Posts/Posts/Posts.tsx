import usePosts from "@/src/hooks/usePosts";
import { fireBaseStore } from "@/src/service";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Community } from "../../atoms/communitiesAtom";
import { Post } from "../../atoms/postsAtoms";

type PostsProps = {
  communityData?: Community;
  userId?: string;
  loadingUser?: boolean;
};

const Posts = ({ communityData }: PostsProps) => {
  const [loading, setLoading] = useState(false);
  const { postStateValue, setPostStateValue } = usePosts();
  const getPosts = async () => {
    console.log("WE ARE GETTING POSTS!!!");

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

      console.log(posts);
    } catch (error: any) {
      console.log("getPosts error", error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getPosts();
  }, []);
  return <></>;
};
export default Posts;
