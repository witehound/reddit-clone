import { Button } from "@chakra-ui/react";
import { ReactNode, memo } from "react";

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
  children?: ReactNode;
  isLoading?: boolean | undefined;
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
  children,
  isLoading,
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
      isLoading={isLoading}
    >
      {text}
      {children}
    </Button>
  );
};

export default memo(CustomButton);
