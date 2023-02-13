import { SearchIcon } from "@chakra-ui/icons";
import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { Height } from "@material-ui/icons";
import { User } from "firebase/auth";
import React from "react";

type SearchInputProps = {
  user: User | null | undefined;
};

//

const SearchInput = ({ user }: SearchInputProps) => {
  return (
    <Flex
      flexGrow={1}
      maxWidth={user ? "auto" : "600px"}
      mr={2}
      align={"center"}
      ml={"2"}
    >
      <InputGroup>
        <InputLeftElement pointerEvents="none" height={"100%"}>
          <SearchIcon color="gray.400" />
        </InputLeftElement>
        <Input
          fontSize={"10pt"}
          border={".5px solid"}
          placeholder="Search Reddit"
          _placeholder={{ color: "gray.500" }}
          _-hover={{
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          _focus={{
            outline: "none",
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          height={"30px"}
          bg={"gray.50"}
          outline={"none"}
          borderColor={"blue.400"}
        />
      </InputGroup>
    </Flex>
  );
};

export default SearchInput;
