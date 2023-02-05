import { authModalState } from "@/src/components/atoms";
import { Flex } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";

const AuthInput = () => {
  const authModal = useRecoilValue(authModalState);
  return (
    <Flex direction={"column"} align={"center"} width={"100%"} mt={4}>
      {authModal.view === "login" ? <Login /> : null}
      {authModal.view === "signup" ? <Signup /> : null}
    </Flex>
  );
};

export default AuthInput;
