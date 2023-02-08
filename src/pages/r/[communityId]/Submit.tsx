import NewPostForm from "@/src/components/Posts/NewPostForm/NewPostForm";
import PageContent from "@/src/components/Layout/PageContent";
import { Box, Text } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { fireBaseAuth } from "@/src/service";
import { useRouter } from "next/router";

const Submit = () => {
  const [user] = useAuthState(fireBaseAuth);
  const router = useRouter();
  const { communityId } = router.query;
  return (
    <div style={{ backgroundColor: "#F0F8FF", width: "100%", height: "100vh" }}>
      <PageContent>
        <>
          <Box>
            <Text p={"14px 0px"} borderBottom="1px solid" borderColor={"white"}>
              Craete a post
            </Text>
          </Box>
          <NewPostForm user={user} communityId={communityId} />
        </>
        <></>
      </PageContent>
    </div>
  );
};

export default Submit;
