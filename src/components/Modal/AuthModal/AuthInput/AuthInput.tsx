import { authModalState } from "@/src/components/atoms";
import { Flex, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import OauthButtons from "../OAuth/OauthButtons";
import { memo } from "react";

const AuthInput = () => {
  const authModal = useRecoilValue(authModalState);
  return (
    <Flex direction={"column"} align={"center"} width={"100%"} mt={4}>
      <OauthButtons />
      <Text color="gray.400" fontWeight={"500"} mb={4}>
        OR
      </Text>
      {authModal.view === "login" ? <Login /> : null}
      {authModal.view === "signup" ? <Signup /> : null}
    </Flex>
  );
};

export default memo(AuthInput);
