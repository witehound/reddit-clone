import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authModalState } from "../components/atoms";
import { postState } from "../components/atoms/postsAtoms";
import { fireBaseAuth } from "../service";

const usePosts = () => {
  const [user, loadingUser] = useAuthState(fireBaseAuth);
  const [postStateValue, setPostStateValue] = useRecoilState(postState);
  const setAuthModalState = useSetRecoilState(authModalState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const onSelectPost = () => {};
  const onDeletePost = async () => {};
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
