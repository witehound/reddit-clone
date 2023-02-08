import React from "react";
import { Stack, Input, Textarea, Flex, Button } from "@chakra-ui/react";

type TextInputsProps = {
  textInputs: {
    title: string;
    body: string;
  };
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleCreatePost: () => void;
  loading: boolean;
};

const TextInputs: React.FC<TextInputsProps> = ({
  textInputs,
  onChange,
  handleCreatePost,
  loading,
}) => {
  return (
    <Stack spacing={3} width="100%">
      <Input
        name="title"
        fontSize={"10pt"}
        border={".5px solid"}
        placeholder="Title"
        value={textInputs.title}
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
        onChange={onChange}
      />
      <Textarea
        name="body"
        fontSize={"10pt"}
        border={".5px solid"}
        placeholder="Text (Optional)"
        value={textInputs.body}
        _placeholder={{ color: "gray.500" }}
        height={"100px"}
        bg={"gray.50"}
        outline={"none"}
        borderColor={"blue.400"}
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
        onChange={onChange}
      />
      <Flex justify="flex-end">
        <Button
          height="34px"
          padding="0px 30px"
          disabled={!textInputs.title}
          isLoading={loading}
          onClick={handleCreatePost}
        >
          Post
        </Button>
      </Flex>
    </Stack>
  );
};
export default TextInputs;
