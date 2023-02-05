import { Button } from "@chakra-ui/react";
import { memo } from "react";

type ButtonProps = {
  text: string;
  varient?: string;
  height?: any;
  display?: any;
  width?: any;
  mr?: number;
  handleClick?: () => void;
};

const CustomButton = ({
  text,
  varient,
  height,
  display,
  width,
  mr,
  handleClick,
}: ButtonProps) => {
  return (
    <Button
      variant={varient}
      height={height}
      display={display}
      width={width}
      mr={mr}
      onClick={handleClick}
    >
      {text}
    </Button>
  );
};

export default memo(CustomButton);
