import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Icon,
  Flex,
  Text,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import { FaRedditSquare } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogout } from "react-icons/md";
import { HiSparkles } from "react-icons/hi";
import { fireBaseAuth } from "../../../../service/index";
import { signOut } from "firebase/auth";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/src/components/atoms";

type UserMenuType = {
  user: User | null | undefined;
};

const UserMenu = ({ user }: UserMenuType) => {
  const setAuthModal = useSetRecoilState(authModalState);

  const signUserOut = () => {
    signOut(fireBaseAuth);
  };

  const logOut = async () => {
    signUserOut();
  };

  const openAuthModal = () => {
    setAuthModal((prev) => ({ open: true, view: "login" }));
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
            <Flex align={"center"}>
              <Flex align={"center"} justify={"center"}>
                {user ? (
                  <>
                    <Icon
                      as={FaRedditSquare}
                      fontSize={22}
                      color={"gray.200"}
                      mr={1}
                      ml={1}
                    />

                    <Flex
                      direction={"column"}
                      display={{ base: "none", lg: "flex" }}
                      fontSize={"8pt"}
                      align={"flex-end"}
                      mr={8}
                    >
                      <Text>
                        {user?.displayName || user?.email?.split("@")[0]}
                      </Text>
                      <Flex>
                        <Icon as={HiSparkles} mr={1} color="brand.100" />
                        <Text color={"gray.400"}>1 karma</Text>
                      </Flex>
                    </Flex>
                    <ChevronDownIcon />
                  </>
                ) : (
                  <>
                    <Icon
                      as={VscAccount}
                      fontSize={22}
                      color={"gray.400"}
                      mr={1}
                      ml={1}
                    />
                    <ChevronDownIcon />
                  </>
                )}
              </Flex>
            </Flex>
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
                onClick={logOut}
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
                onClick={openAuthModal}
              >
                <Flex align={"center"}>
                  <Icon as={CgProfile} fontSize={20} mr={2} />
                  Log In / Sign Up{" "}
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
