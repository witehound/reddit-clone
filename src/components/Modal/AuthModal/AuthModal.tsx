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
import Login from "./Login/Login";
import AuthInput from "./AuthInput/AuthInput";

const AuthModal = () => {
  const [authModal, setAuthModal] = useRecoilState(authModalState);

  const handleClose = () => {
    setAuthModal((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      <Modal isOpen={authModal.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
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
          >
            <Flex
              direction={"column"}
              align={"center"}
              justifyContent={"center"}
              width={"70%"}
            >
              <AuthInput />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthModal;
