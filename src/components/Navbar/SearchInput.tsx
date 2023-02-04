import { SearchIcon } from "@chakra-ui/icons";
import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { Height } from "@material-ui/icons";
import React from "react";

type SearchInputProps = {};
const SearchInput = ({}: SearchInputProps) => {
  return (
    <Flex flexGrow={1} mr={2} align={"center"}>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          height={"100%"}
          children={<SearchIcon color="gray.400" />}
        />
        <Input
          fontSize={"10pt"}
          border={".5px solid"}
          placeholder="Search Reddit"
          _placeholder={{ color: "gray.500" }}
          _hover={{ bg: "white", border: "1px solid", borderColor: "blue.500" }}
          _focus={{
            outline: "none",
            border: "1px solid",
            borderColor: "blue.5",
          }}
          height={"30px"}
          bg={"gray.50"}
        />
      </InputGroup>
    </Flex>
  );
};

export default SearchInput;
