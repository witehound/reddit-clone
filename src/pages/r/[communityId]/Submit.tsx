import NewPostForm from "@/src/components/Posts/NewPostForm/NewPostForm";
import PageContent from "@/src/components/Layout/PageContent";
import { Box, Text } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { fireBaseAuth } from "@/src/service";
import useCommunities from "@/src/hooks/useCommunity";
import About from "@/src/components/Community/About/About";

const Submit = () => {
  const [user] = useAuthState(fireBaseAuth);
  const { communityStateValue } = useCommunities();

  return (
    <div style={{ backgroundColor: "#F0F8FF", width: "100%", height: "100vh" }}>
      <PageContent>
        <>
          <Box>
            <Text p={"14px 0px"} borderBottom="1px solid" borderColor={"white"}>
              Craete a post
            </Text>
          </Box>
          {user && (
            <NewPostForm
              user={user}
              communityId={communityStateValue.currentCommunity?.id}
              communityImageURL={communityStateValue.currentCommunity?.imageUrl}
            />
          )}
        </>
        <>
          {communityStateValue.currentCommunity ? (
            <About communityData={communityStateValue.currentCommunity} />
          ) : null}
        </>
      </PageContent>
    </div>
  );
};

export default Submit;
