import { Flex, Image } from "@chakra-ui/react";
import SearchInput from "./SearchInput";

const Navbar = () => {
  return (
    <Flex padding={"12px"} height={"44px"} align={"center"}>
      <Flex align={"center"}>
        <Image src={"/images/redditFace.svg"} height={"30px"} />
        <Image
          src={"/images/redditText.svg"}
          height={"46px"}
          display={{ base: "none", md: "unset" }}
        />
      </Flex>
      <SearchInput />
      Navbar
    </Flex>
  );
};

export default Navbar;
