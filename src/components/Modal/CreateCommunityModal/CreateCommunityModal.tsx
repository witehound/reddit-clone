import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Box,
  Flex,
  Input,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";

type CreateCommunityModalType = {
  open: boolean;
  handleClose: () => void;
};

const CreateCommunityModal = ({
  open,
  handleClose,
}: CreateCommunityModalType) => {
  const [communityName, setCommunityName] = useState<string>("");
  const [charsRemaining, setCharRemaining] = useState(21);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 21) return;
    setCommunityName(e.target.value);
    setCharRemaining(21 - e.target.value?.length);
  };

  return (
    <>
      <Modal blockScrollOnMount={false} isOpen={open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            flexDirection={"column"}
            fontSize={15}
            padding={2}
          >
            Create a communitity
          </ModalHeader>
          <Box pl={3} pr={3}>
            <Flex bg={"gray.200"} flexGrow={1} height={".5px"} />
            <ModalCloseButton />

            <ModalBody
              display="flex"
              flexDirection={"column"}
              padding="10px 0px"
            >
              <Text fontWeight={500} fontSize={15}>
                Name
              </Text>
              <Text fontSize={11} color="gray.500">
                Communities name including capitalization cannot be changed
              </Text>
              <Text
                position={"relative"}
                top="28px"
                left={"10px"}
                width="20px"
                color={"gray.400"}
              >
                r/
              </Text>
              <Input
                position={"relative"}
                value={communityName}
                size="sm"
                pl="22px"
                onChange={handleChange}
                border={".5px solid"}
                borderColor={"blue.400"}
              />
              <Text
                fontSize={11}
                color={charsRemaining != 0 ? "gray.500" : "red"}
                mt={2}
              >
                Characters Remaining {charsRemaining}
              </Text>
            </ModalBody>
          </Box>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateCommunityModal;
