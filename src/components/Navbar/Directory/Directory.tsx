import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuList, Icon, Flex, Text } from "@chakra-ui/react";
import { TiHome } from "react-icons/ti";
import Communities from "./Communities/Communities";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/src/components/atoms";

const Directory = () => {
  const setAuthModal = useSetRecoilState(authModalState);

  return (
    <div>
      <Menu>
        <Flex align={"center"}>
          <MenuButton
            cursor={"pointer"}
            padding={"0px 6px"}
            borderRadius={4}
            _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
            mr={2}
            ml={{ base: 0, md: 2 }}
          >
            <Flex
              align={"center"}
              justify={"space-between"}
              width={{ base: "auto", lg: "200px" }}
            >
              <Flex align={"center"} justify={"center"}>
                <Icon as={TiHome} fontSize={24} mr={{ base: 1, md: 2 }} />
                <Flex display={{ base: "none", lg: "flex" }}>
                  <Text fontWeight={500} fontSize={14}>
                    Home
                  </Text>
                </Flex>
              </Flex>
              <ChevronDownIcon />
            </Flex>
          </MenuButton>
        </Flex>

        <MenuList borderColor={"gray.200"}>
          <Communities />
        </MenuList>
      </Menu>
    </div>
  );
};

export default Directory;
