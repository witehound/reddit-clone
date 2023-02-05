import CustomButton from "@/src/components/CustomButton/CustomButton";
import { Flex, Image } from "@chakra-ui/react";

const OauthButtons = () => {
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
        handleClick={() => {}}
        mb={2}
        width="100%"
        varient="oauth"
      >
        <Image src={"./images/googlelogo.png"} height={"20px"} ml="10px" />
      </CustomButton>
    </Flex>
  );
};

export default OauthButtons;
