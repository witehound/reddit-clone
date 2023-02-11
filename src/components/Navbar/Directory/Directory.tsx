import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  Icon,
  Flex,
  Text,
  Image,
} from "@chakra-ui/react";
import { TiHome } from "react-icons/ti";
import Communities from "./Communities/Communities";
import useDirectory from "@/src/hooks/useDirectory";

const Directory = () => {
  const { directoryState, toggleMenuOpen } = useDirectory();

  return (
    <div>
      <Menu isOpen={directoryState.isOpen}>
        <Flex align={"center"}>
          <MenuButton
            cursor={"pointer"}
            padding={"0px 6px"}
            borderRadius={4}
            _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
            mr={2}
            ml={{ base: 0, md: 2 }}
            onClick={toggleMenuOpen}
          >
            <Flex
              align={"center"}
              justify={"space-between"}
              width={{ base: "auto", lg: "200px" }}
            >
              <Flex align={"center"} justify={"center"}>
                {directoryState.selectedMenuItem.imageURL ? (
                  <Image
                    src={directoryState.selectedMenuItem.imageURL}
                    borderRadius="full"
                    boxSize={"24px"}
                    mr={2}
                    objectFit="cover"
                  />
                ) : (
                  <Icon
                    as={TiHome}
                    fontSize={24}
                    mr={{ base: 1, md: 2 }}
                    color={directoryState.selectedMenuItem.iconColor}
                  />
                )}

                <Flex display={{ base: "none", lg: "flex" }}>
                  <Text fontWeight={500} fontSize={14}>
                    {directoryState.selectedMenuItem.displayText}
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
