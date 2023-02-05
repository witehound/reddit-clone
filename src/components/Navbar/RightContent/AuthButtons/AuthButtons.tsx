import CustomButton from "@/src/components/CustomButton/CustomButton";

const AuthButtons = () => {
  return (
    <>
      <CustomButton
        text="Login"
        varient="outline"
        height={"28px"}
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
        onClick={() => {}}
      />
      <CustomButton
        text="Sign up"
        height={"28px"}
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
        onClick={() => {}}
      />
    </>
  );
};

export default AuthButtons;
