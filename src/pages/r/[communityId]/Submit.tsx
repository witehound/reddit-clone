import NewPostForm from "@/src/components/Posts/NewPostForm/NewPostForm";
import PageContent from "@/src/components/Layout/PageContent";
import { Box, Text } from "@chakra-ui/react";

const Submit = () => {
  return (
    <PageContent>
      <>
        <Box>
          <Text
            p={"14px 0px"}
            borderBottom="1px solid"
            borderColor={"gray.400"}
          >
            Craete a post
          </Text>
        </Box>
        <NewPostForm />
      </>
      <></>
    </PageContent>
  );
};

export default Submit;
