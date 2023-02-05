import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Flex,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { authModalState } from "../../atoms";
import AuthInput from "./AuthInput/AuthInput";
import { useAuthState } from "react-firebase-hooks/auth";
import { fireBaseAuth } from "@/src/service";
import { useEffect } from "react";
import ResetPassword from "./ResetPassword/ResetPassword";

const AuthModal = () => {
  const [authModal, setAuthModal] = useRecoilState(authModalState);
  const [user, loading, error] = useAuthState(fireBaseAuth);

  const handleClose = () => {
    setAuthModal((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    if (user) handleClose();
  }, [user]);

  return (
    <>
      <Modal isOpen={authModal.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>
            {authModal.view === "login" && "Login"}
            {authModal.view === "signup" && "Sign Up"}
            {authModal.view === "resetpassword" && "Reset Password"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            pb={6}
          >
            <Flex
              direction={"column"}
              align={"center"}
              justifyContent={"center"}
              width={"70%"}
            >
              {authModal.view === "login" || authModal.view === "signup" ? (
                <AuthInput />
              ) : (
                <ResetPassword />
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthModal;
