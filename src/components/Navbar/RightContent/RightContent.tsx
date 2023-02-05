import { Flex } from "@chakra-ui/react";
import AuthButtons from "./AuthButtons/AuthButtons";
import { AuthModal } from "../../Modal";
import { User, signOut } from "firebase/auth";
import Icons from "./Icons/Icons";

type RightContentProps = {
  user: User | null | undefined;
};

const RightContent = ({ user }: RightContentProps) => {
  return (
    <>
      <AuthModal />
      <Flex justify={"center"} align={"center"}>
        {user ? <Icons /> : <AuthButtons />}
      </Flex>
    </>
  );
};

export default RightContent;
