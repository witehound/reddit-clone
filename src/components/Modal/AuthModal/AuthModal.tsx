import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { authModalState } from "../../atoms";

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
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Here is a modal</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthModal;
