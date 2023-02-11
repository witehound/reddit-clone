import { async } from "@firebase/util";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  writeBatch,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authModalState } from "../components/atoms";
import {
  Community,
  CommunitySnippet,
  communityState,
} from "../components/atoms/communitiesAtom";
import { fireBaseAuth, fireBaseStore } from "../service";

const useCommunities = () => {
  const setAuthModal = useSetRecoilState(authModalState);
  const [user] = useAuthState(fireBaseAuth);
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>("");
  const router = useRouter()

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
    } catch (error: any) {
      console.log(`[geMySnippet] :${error}`);
      setError(error?.message);
    }
    setLoading(false);
  };

  const joinCommunity = async (communityData: Community) => {
    try {
      const batch = writeBatch(fireBaseStore);
      const newSnippet: CommunitySnippet = {
        communityId: communityData.id,
        imageUrl: communityData.imageUrl || "",
      };
      batch.set(
        doc(
          fireBaseStore,
          `users/${user?.uid}/communitySnippets`,
          communityData.id
        ),
        newSnippet
      );
      batch.update(doc(fireBaseStore, `communities`, communityData.id), {
        numberOfMembers: increment(1),
      });

      await batch.commit();

      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [...prev.mySnippets, newSnippet],
      }));
    } catch (error: any) {
      console.log(`[joinCommunity error : ${error}]`);
      setError(error?.message);
    }

    setLoading(false);
  };

  const leaveCommunity = async (communityId: string) => {
    const batch = writeBatch(fireBaseStore);
    try {
      batch.delete(
        doc(fireBaseStore, `users/${user?.uid}/communitySnippets`, communityId)
      );
      batch.update(doc(fireBaseStore, `communities`, communityId), {
        numberOfMembers: increment(-1),
      });

      await batch.commit();

      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.filter(
          (item) => item.communityId !== communityId
        ),
      }));
    } catch (error: any) {
      console.log(`[leaveCommunity error : ${error}]`);
      setError(error?.message);
    }

    setLoading(false);
  };

  const onJoinOrLeaveCommuunity = (
    communityData: Community,
    isJoined: boolean
  ) => {
    console.log("ON JOIN LEAVE", communityData.id);

    if (!user) {
      setAuthModal({ open: true, view: "login" });
      return;
    }

    setLoading(true);
    if (isJoined) {
      leaveCommunity(communityData.id);
      return;
    }
    joinCommunity(communityData);
  };

  useEffect(() => {
    if (!user) {
      setCommunityStateValue(prev => ({
        ...prev,
        mySnippets : []
      }))
      return
    } 
      gteMySnippets();
    
    
  }, [user]);

  const getCommunityData = async (communityId: string) => {
    try {
      const communityDocRef = doc(
        fireBaseStore,
        "communities",
        communityId as string
      );
      const communityDoc = await getDoc(communityDocRef);
 
      setCommunityStateValue((prev) => ({
        ...prev,
        currentCommunity: {
          id: communityDoc.id,
          ...communityDoc.data(),
        } as Community,
      }));
    } catch (error: any) {
      console.log("getCommunityData error", error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    const { communityId } = router.query

    if (communityId && !communityStateValue.currentCommunity) {
      getCommunityData(communityId as string)
    }
  },[router.query, communityStateValue.currentCommunity])

 
  return {
    communityStateValue,
    onJoinOrLeaveCommuunity,
    loading,
  };
};

export default useCommunities;
