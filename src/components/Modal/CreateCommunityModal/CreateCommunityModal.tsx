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
import { ChangeEvent, useEffect, useState } from "react";

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
  const [communityType, setCommunityType] = useState<any>("public");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 21) return;
    setCommunityName(e.target.value);
    setCharRemaining(21 - e.target.value?.length);
  };

  const updateCheckedValue = (e: any) => {
    setCommunityType(e?.target?.name);
  };

  useEffect(() => {}, [communityType]);

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
              <Box mb={2} mt={2}>
                <Text fontWeight={500} fontSize={14}>
                  Commuinity Type
                </Text>
                <Flex direction={"column"}>
                  <Flex mb={1}>
                    <Flex mr={2}>
                      <input
                        type="checkbox"
                        checked={communityType === "public"}
                        name={"public"}
                        onChange={updateCheckedValue}
                      />
                    </Flex>
                    <label>Public</label>
                  </Flex>
                  <Flex mb={1}>
                    <Flex mr={2}>
                      <input
                        type="checkbox"
                        checked={communityType === "restricted"}
                        name={"restricted"}
                        onChange={updateCheckedValue}
                      />
                    </Flex>
                    <label>Restricted</label>
                  </Flex>
                  <Flex mb={1}>
                    <Flex mr={2}>
                      <input
                        type="checkbox"
                        name={"private"}
                        checked={communityType === "private"}
                        onChange={updateCheckedValue}
                      />
                    </Flex>
                    <label>Private</label>
                  </Flex>
                </Flex>
              </Box>
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
