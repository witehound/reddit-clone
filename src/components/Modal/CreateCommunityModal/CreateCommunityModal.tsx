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
  Icon,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { HiLockClosed } from "react-icons/hi";
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";

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

  const updateCheckedValue = (e: ChangeEvent<HTMLInputElement>) => {
    setCommunityType(e?.target?.name);
  };

  useEffect(() => {}, [communityType]);

  return (
    <>
      <Modal
        blockScrollOnMount={false}
        isOpen={open}
        onClose={handleClose}
        size="lg"
      >
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
                  <Flex mb={1} align={"center"}>
                    <Flex mr={2}>
                      <input
                        type="checkbox"
                        checked={communityType === "public"}
                        name={"public"}
                        onChange={updateCheckedValue}
                      />
                    </Flex>
                    <Icon as={BsFillPersonFill} color="gray.500" mr={1} />
                    <label style={{ fontSize: "12px" }}>Public</label>
                    <Text fontSize={11} color={"gray.500"} ml={2}>
                      Any one can view post and comment to this community
                    </Text>
                  </Flex>
                  <Flex mb={1} align="center">
                    <Flex mr={2}>
                      <input
                        type="checkbox"
                        checked={communityType === "restricted"}
                        name={"restricted"}
                        onChange={updateCheckedValue}
                      />
                    </Flex>
                    <Icon as={BsFillEyeFill} color="gray.500" mr={1} />
                    <label style={{ fontSize: "12px" }}>Restricted</label>
                    <Text fontSize={11} color={"gray.500"} ml={2}>
                      Any one can view this community, but only approved users
                      can post
                    </Text>
                  </Flex>
                  <Flex mb={1} align="center">
                    <Flex mr={2}>
                      <input
                        type="checkbox"
                        name={"private"}
                        checked={communityType === "private"}
                        onChange={updateCheckedValue}
                      />
                    </Flex>
                    <Icon as={HiLockClosed} color="gray.500" mr={1} />
                    <label style={{ fontSize: "12px" }}>Private</label>
                    <Text
                      fontSize={11}
                      color={"gray.500"}
                      ml={2}
                      position="relative"
                    >
                      Only approvred users can view and submit to this community
                    </Text>
                  </Flex>
                </Flex>
              </Box>
            </ModalBody>
          </Box>

          <ModalFooter bg="gray.100" borderRadius={"0px 0px 10px 10px"}>
            <Button
              variant={"outline"}
              height={"30px"}
              mr={3}
              onClick={handleClose}
            >
              Close
            </Button>
            <Button height={"30px"} onClick={() => {}}>
              Create community
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateCommunityModal;
