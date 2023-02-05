import { CreateCommunityModal } from "@/src/components/Modal";
import { MenuItem, Flex, Icon } from "@chakra-ui/react";
import { useState } from "react";
import { GrAdd } from "react-icons/gr";

const Communities = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <CreateCommunityModal open={open} handleClose={handleClose} />
      <MenuItem
        width={"100%"}
        fontSize={"10pt"}
        _hover={{ bg: "gray.100" }}
        onClick={() => setOpen(true)}
      >
        <Flex align={"center"}>
          <Icon as={GrAdd} fontSize={18} mr={2} />
          Create Community
        </Flex>
      </MenuItem>
    </>
  );
};

export default Communities;
