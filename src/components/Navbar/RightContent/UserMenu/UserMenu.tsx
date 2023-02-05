import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import { FaRedditSquare } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";

type UserMenuType = {
  user: User | null | undefined;
};

const UserMenu = ({ user }: UserMenuType) => {
  return (
    <div>
      <Menu>
        <Flex align={"center"}>
          <MenuButton
            cursor={"pointer"}
            padding={"0px 6px"}
            borderRadius={4}
            _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
          >
            {user ? (
              <>
                <Flex align={"center"}>
                  <Flex align={"center"} justify={"center"}>
                    <Icon
                      as={FaRedditSquare}
                      fontSize={22}
                      color={"gray.200"}
                      mr={1}
                      ml={1}
                    />
                    <ChevronDownIcon />
                  </Flex>
                </Flex>
              </>
            ) : (
              <Icon
                as={VscAccount}
                fontSize={22}
                color={"gray.400"}
                mr={1}
                ml={1}
              />
            )}
          </MenuButton>
        </Flex>

        <MenuList>
          <MenuItem>Download</MenuItem>
          <MenuItem>Create a Copy</MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

export default UserMenu;
