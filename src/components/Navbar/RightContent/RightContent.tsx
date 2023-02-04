import { Flex } from "@chakra-ui/react";
import AuthButtons from "./AuthButtons/AuthButtons";

type RightContentProps = {};

const RightContent = ({}: RightContentProps) => {
  return (
    <>
      {/* {Auth} */}
      <Flex justify={"center"} align={"center"}>
        <AuthButtons />
      </Flex>
    </>
  );
};

export default RightContent;
