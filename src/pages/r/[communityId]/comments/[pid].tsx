import React, { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

import PageContentLayout from "../../../../components/Layout/PageContent";

import usePosts from "../../../../hooks/usePosts";
import { fireBaseAuth, fireBaseStore } from "@/src/service";
import useCommunities from "@/src/hooks/useCommunity";
import { Post } from "@/src/components/atoms/postsAtoms";
import About from "@/src/components/Community/About/About";
import PostItem from "@/src/components/Posts/PostItem/PostItem";
import PostLoader from "@/src/components/Posts/PostLoader/PostLoader";

type PostPageProps = {};

const PostPage: React.FC<PostPageProps> = () => {
  const [user] = useAuthState(fireBaseAuth);
  const router = useRouter();
  const { community, pid } = router.query;
  const { communityStateValue } = useCommunities();

  const {
    postStateValue,
    setPostStateValue,
    onDeletePost,
    loading,
    setLoading,
    onVote,
  } = usePosts();

  const fetchPost = async () => {
    setLoading(true);
    try {
      const postDocRef = doc(fireBaseStore, "posts", pid as string);
      const postDoc = await getDoc(postDocRef);
      setPostStateValue((prev) => ({
        ...prev,
        selectedPost: { id: postDoc.id, ...postDoc.data() } as Post,
      }));
    } catch (error: any) {
      console.log(`[fetchPost error]`, error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    const { pid } = router.query;

    if (pid && !postStateValue.selectedPost) {
      fetchPost();
    }
  }, [router.query, postStateValue.selectedPost]);

  return (
    <PageContentLayout>
      <>
        {loading ? (
          <PostLoader />
        ) : (
          <>
            {postStateValue.selectedPost && (
              <>
                <PostItem
                  post={postStateValue.selectedPost}
                  //   // postIdx={postStateValue.selectedPost.postIdx}
                  onVote={onVote}
                  onDeletePost={onDeletePost}
                  userVoteValue={
                    postStateValue.postVotes.find(
                      (item) => item.postId === postStateValue.selectedPost!.id
                    )?.voteValue
                  }
                  userIsCreator={
                    user?.uid === postStateValue.selectedPost.creatorId
                  }
                  router={router}
                />
                {/* <Comment
                  user={user}
                  community={community as string}
                  selectedPost={postStateValue.selectedPost}
                /> */}
              </>
            )}
          </>
        )}
      </>

      {/* <>
        <About
          communityData={
            communityStateValue.currentCommunity
            // communityStateValue.visitedCommunities[community as string]
          }
          loading={loading}
        />
      </> */}
    </PageContentLayout>
  );
};
export default PostPage;
