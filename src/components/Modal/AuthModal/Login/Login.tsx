import { ChangeEvent, FormEvent, useState } from "react";
import { Flex, Input, Text } from "@chakra-ui/react";
import CustomButton from "@/src/components/CustomButton/CustomButton";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/src/components/atoms";
import { fireBaseAuth, fireBaseErrors } from "@/src/service";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

type loginFormType = {
  email: string;
  password: string;
};

const Login = () => {
  const setAutModal = useSetRecoilState(authModalState);
  const [loginForm, setLoginForm] = useState<loginFormType>({
    email: "",
    password: "",
  });

  const [signInWithEmailAndPassword, user, loading, userError] =
    useSignInWithEmailAndPassword(fireBaseAuth);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    signInWithEmailAndPassword(loginForm.email, loginForm.password);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <form onSubmit={onSubmit}>
      <Input
        required
        height={"30px"}
        name="email"
        placeholder="email"
        type={"email"}
        mb={2}
        onChange={onChange}
        fontSize={"10pt"}
        border={".5px solid"}
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
        bg={"gray.50"}
        outline={"none"}
        borderColor={"blue.400"}
      />
      <Input
        required
        height={"30px"}
        name="password"
        placeholder="password"
        type={"password"}
        mb={2}
        onChange={onChange}
        fontSize={"10pt"}
        border={".5px solid"}
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
        bg={"gray.50"}
        outline={"none"}
        borderColor={"blue.400"}
      />

      <Text textAlign={"center"} color={"red"} fontSize={"9pt"} mb={2}>
        {fireBaseErrors[userError?.message as keyof typeof fireBaseErrors]}
      </Text>

      <CustomButton
        type="submit"
        text="Log In"
        handleClick={() => {}}
        width={"100%"}
        height={"30px"}
        mb={2}
        isLoading={loading}
      />
      <Flex justifyContent="center" mb={2}>
        <Text fontSize="9pt" mr={1}>
          Forgot your password?
        </Text>
        <Text
          fontSize="9pt"
          color="blue.500"
          cursor="pointer"
          onClick={() => {
            setAutModal((prev) => ({ ...prev, view: "resetpassword" }));
          }}
        >
          Reset
        </Text>
      </Flex>
      <Flex fontSize={"9pt"} justifyContent={"center"} gap={4}>
        <Text>New Here ?</Text>
        <Text
          color={"blue.500"}
          fontWeight={"700"}
          cursor={"pointer"}
          onClick={() => {
            setAutModal((prev) => ({ ...prev, view: "signup" }));
          }}
        >
          Sign Up
        </Text>
      </Flex>
    </form>
  );
};

export default Login;
