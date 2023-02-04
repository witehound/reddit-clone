import { Button } from "@chakra-ui/react";
import { memo } from "react";

type ButtonProps = {
  text: string;
};

const CustomButton = ({ text }: ButtonProps) => {
  return <Button>{text}</Button>;
};

export default memo(CustomButton);
