import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import {
  Community,
  CommunitySnippet,
  communityState,
} from "../components/atoms/communitiesAtom";
import { fireBaseAuth, fireBaseStore } from "../service";

const useCommunities = () => {
  const [user] = useAuthState(fireBaseAuth);
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const gteMySnippets = async () => {
    setLoading(true);
    try {
      const mySnippets = await getDocs(
        collection(fireBaseStore, `users/${user?.uid}/communitySnippets`)
      );
      const snippets = mySnippets.docs.map((doc) => ({
        ...doc.data(),
      }));
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: snippets as CommunitySnippet[],
      }));
    } catch (error) {
      console.log(`[geMySnippet] :${error}`);
    }
    setLoading(false);
  };

  const joinCommunity = () => {};
  const leaveCommunity = (communityId: string) => {};

  const onJoinOrLeaveCommuunity = (
    communityData: Community,
    isJoined: boolean
  ) => {};

  useEffect(() => {
    if (!user) return;
    gteMySnippets();
  }, [user]);

  return {
    communityStateValue,
    onJoinOrLeaveCommuunity,
    loading,
  };
};

export default useCommunities;
