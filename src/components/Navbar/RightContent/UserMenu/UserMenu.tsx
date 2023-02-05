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
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogout } from "react-icons/md";
import { fireBaseAuth } from "../../../../service/index";
import { signOut } from "firebase/auth";

type UserMenuType = {
  user: User | null | undefined;
};

const UserMenu = ({ user }: UserMenuType) => {
  const signUserOut = () => {
    signOut(fireBaseAuth);
  };
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

        <MenuList borderColor={"gray.200"}>
          {user ? (
            <>
              <MenuItem
                fontSize={"10pt"}
                fontWeight={700}
                _hover={{ bg: "blue.500", color: "white" }}
              >
                <Flex align={"center"}>
                  <Icon as={CgProfile} fontSize={20} mr={2} />
                  Profile
                </Flex>
              </MenuItem>
              <Flex bg={"gray.200"} flexGrow={1} height={".5px"} />
              <MenuItem
                fontSize={"10pt"}
                fontWeight={700}
                _hover={{ bg: "blue.500", color: "white" }}
                onClick={signUserOut}
              >
                <Flex align={"center"}>
                  <Icon as={MdOutlineLogout} fontSize={20} mr={2} />
                  Log Out
                </Flex>
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem
                fontSize={"10pt"}
                fontWeight={700}
                _hover={{ bg: "blue.500", color: "white" }}
              >
                <Flex align={"center"}>
                  <Icon as={CgProfile} fontSize={20} mr={2} />
                  Profile
                </Flex>
              </MenuItem>
            </>
          )}
        </MenuList>
      </Menu>
    </div>
  );
};

export default UserMenu;
