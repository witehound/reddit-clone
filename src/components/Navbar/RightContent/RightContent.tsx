import { Flex } from "@chakra-ui/react";
import AuthButtons from "./AuthButtons/AuthButtons";
import { AuthModal } from "../../Modal";

type RightContentProps = {};

const RightContent = ({}: RightContentProps) => {
  return (
    <>
      <AuthModal />
      <Flex justify={"center"} align={"center"}>
        <AuthButtons />
      </Flex>
    </>
  );
};

export default RightContent;
