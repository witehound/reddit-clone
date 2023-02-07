import CustomButton from "@/src/components/CustomButton/CustomButton";
import { fireBaseAuth } from "@/src/service";
import { Flex, Image, Text } from "@chakra-ui/react";
import { collection, doc, setDoc } from "firebase/firestore";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { fireBaseStore } from "@/src/service";
import { User } from "firebase/auth";
import { useEffect } from "react";

const OauthButtons = () => {
  const [signInWithGoogle, user, loading, userError] =
    useSignInWithGoogle(fireBaseAuth);

  const createUserDocument = async (user: User) => {
    const userDocRef = doc(fireBaseStore, "users", user.uid);
    await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
  };

  useEffect(() => {
    if (user) {
      createUserDocument(user.user);
    }
  }, [user]);
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
