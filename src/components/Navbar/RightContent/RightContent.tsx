import { Flex } from "@chakra-ui/react";
import AuthButtons from "./AuthButtons/AuthButtons";
import { AuthModal } from "../../Modal";
import { User } from "firebase/auth";
import Icons from "./Icons/Icons";
import UserMenu from "./UserMenu/UserMenu";

type RightContentProps = {
  user: User | null | undefined;
};

const RightContent = ({ user }: RightContentProps) => {
  return (
    <>
      <AuthModal />
      <Flex justify={"center"} align={"center"}>
        {user ? <Icons /> : <AuthButtons />}
        <UserMenu user={user} />
      </Flex>
    </>
  );
};

export default RightContent;
