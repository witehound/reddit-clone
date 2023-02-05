import CustomButton from "@/src/components/CustomButton/CustomButton";
import { authModalState } from "@/src/components/atoms";
import { useSetRecoilState } from "recoil";

const AuthButtons = () => {
  const setAuthModal = useSetRecoilState(authModalState);

  const openLogin = () => {};

  return (
    <>
      <CustomButton
        text="Login"
        varient="outline"
        height={"28px"}
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
        handleClick={() => setAuthModal({ open: true, view: "login" })}
      />
      <CustomButton
        text="Sign up"
        height={"28px"}
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
        handleClick={() => setAuthModal({ open: true, view: "signup" })}
      />
    </>
  );
};

export default AuthButtons;
