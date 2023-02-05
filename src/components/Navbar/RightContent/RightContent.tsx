import { Button, Flex } from "@chakra-ui/react";
import AuthButtons from "./AuthButtons/AuthButtons";
import { AuthModal } from "../../Modal";
import { signOut } from "firebase/auth";
import { fireBaseAuth } from "@/src/service";

type RightContentProps = {
  user: any | null | undefined;
};

const RightContent = ({ user }: RightContentProps) => {
  return (
    <>
      <AuthModal />
      <Flex justify={"center"} align={"center"}>
        {user ? (
          <Button onClick={() => signOut(fireBaseAuth)}>Sign out</Button>
        ) : (
          <AuthButtons />
        )}
      </Flex>
    </>
  );
};

export default RightContent;
