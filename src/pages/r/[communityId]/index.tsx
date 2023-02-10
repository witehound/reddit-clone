import {
  Community,
  communityState,
} from "@/src/components/atoms/communitiesAtom";
import About from "@/src/components/Community/About/About";
import CommunityNotFound from "@/src/components/Community/CommunityNotFound/CommunityNotFound";
import CreatePostLink from "@/src/components/Community/CreatePostLink/CreatePostLink";
import Header from "@/src/components/Community/Header/Header";
import PageContent from "@/src/components/Layout/PageContent";
import Posts from "@/src/components/Posts/Posts/Posts";
import { fireBaseStore } from "@/src/service";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext, NextPage } from "next";
import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import safeJsonStringify from "safe-json-stringify";

type CommunityPageProps = {
  communityData: Community;
};

const CommunityPage: NextPage<CommunityPageProps> = ({ communityData }) => {
  const setCommunityStateValue = useSetRecoilState(communityState);
  if (!communityData) {
    return <CommunityNotFound />;
  }

  useEffect(() => {
    setCommunityStateValue((prev) => ({
      ...prev,
      currentCommunity: communityData,
    }));
  }, []);

  return (
    <>
      <Header communityData={communityData} />

      <PageContent>
        <>
          <div>
            <CreatePostLink />
            <Posts communityData={communityData} />
          </div>
        </>
        <>
          <About communityData={communityData} />
        </>
      </PageContent>
    </>
  );
};

export default CommunityPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const communityDocRef = doc(
      fireBaseStore,
      "communities",
      context.query.communityId as string
    );

    const communityDoc = await getDoc(communityDocRef);

    return {
      props: {
        communityData: communityDoc.exists()
          ? JSON.parse(
              safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
            )
          : "",
      },
    };
  } catch (error) {
    console.log(`[getServerSidePropsError] : ${error}`);
  }
}
