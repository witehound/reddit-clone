import { Flex, Image } from "@chakra-ui/react";
import SearchInput from "./SearchInput/SearchInput";
import RightContent from "./RightContent/RightContent";
import { useAuthState } from "react-firebase-hooks/auth";
import { fireBaseAuth } from "@/src/service";

const Navbar = () => {
  const [user, loading, error] = useAuthState(fireBaseAuth);
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
      <SearchInput user={user} />
      <RightContent user={user} />
    </Flex>
  );
};

export default Navbar;
