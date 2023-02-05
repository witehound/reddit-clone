import CustomButton from "@/src/components/CustomButton/CustomButton";
import { fireBaseAuth } from "@/src/service";
import { Flex, Image, Text } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

const OauthButtons = () => {
  const [signInWithGoogle, user, loading, userError] =
    useSignInWithGoogle(fireBaseAuth);
  return (
    <Flex
      flex={1}
      align={"center"}
      justifyContent={"center"}
      direction={"column"}
      mb={4}
    >
      <CustomButton
        text="Continue with google"
        height={"30px"}
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
        handleClick={() => signInWithGoogle()}
        mb={2}
        width="100%"
        varient="oauth"
        isLoading={loading}
      >
        <Image src={"./images/googlelogo.png"} height={"20px"} ml="10px" />
      </CustomButton>
      <Text textAlign={"center"} color={"red"} fontSize={"9pt"} mb={2}>
        {userError?.message ? "Failed to authenticate user with goole" : null}
      </Text>
    </Flex>
  );
};

export default OauthButtons;
