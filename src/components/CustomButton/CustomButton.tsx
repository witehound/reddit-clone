import { Button } from "@chakra-ui/react";
import { memo } from "react";

type ButtonProps = {
  text: string;
  varient?: string;
  height?: any;
  display?: any;
  width?: any;
  mr?: number;
  border?: any;
  handleClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  mb?: any;
};

const CustomButton = ({
  text,
  varient,
  height,
  display,
  width,
  mr,
  border,
  handleClick,
  type = "button",
  mb,
}: ButtonProps) => {
  return (
    <Button
      type={type}
      variant={varient}
      height={height}
      display={display}
      width={width}
      mr={mr}
      border={border}
      mb={mb}
      onClick={handleClick}
    >
      {text}
    </Button>
  );
};

export default memo(CustomButton);
