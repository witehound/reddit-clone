import { Community } from "@/src/components/atoms/communitiesAtom";
import CommunityNotFound from "@/src/components/Community/CommunityNotFound/CommunityNotFound";
import CreatePostLink from "@/src/components/Community/CreatePostLink/CreatePostLink";
import Header from "@/src/components/Community/Header/Header";
import PageContent from "@/src/components/Layout/PageContent";
import { fireBaseStore } from "@/src/service";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext, NextPage } from "next";
import React from "react";
import safeJsonStringify from "safe-json-stringify";

type CommunityPageProps = {
  communityData: Community;
};

const CommunityPage: NextPage<CommunityPageProps> = ({ communityData }) => {
  if (!communityData) {
    return <CommunityNotFound />;
  }
  return (
    <>
      <Header communityData={communityData} />

      <PageContent>
        <>
          <div>
            <CreatePostLink />
          </div>
        </>
        <>
          <div>rhs</div>
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
              safeJsonStringify({ id: communityDoc.id, ...communityDoc.data })
            )
          : "",
      },
    };
  } catch (error) {
    console.log(`[getServerSidePropsError] : ${error}`);
  }
}
