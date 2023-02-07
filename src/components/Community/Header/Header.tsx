import { Box, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { FaReddit } from "react-icons/fa";
import { Community } from "../../atoms/communitiesAtom";

type HeeaderComponentProps = {
  communityData: Community;
};

const Header = ({ communityData }: HeeaderComponentProps) => {
  return (
    <>
      <Flex direction={"column"} width="100%" height={"146px"}>
        <Box height={"50%"} bg="blue.400" />
        <Flex justify={"center"} bg="white" flexGrow={1}>
          <Flex width={"95%"} maxWidth="860px">
            {communityData.imageUrl ? (
              <Image src={communityData.imageUrl} />
            ) : (
              <Icon
                as={FaReddit}
                fontSize={64}
                position="relative"
                top={-3}
                color="blue.500"
                border={"4px solid white"}
                borderRadius="50%"
              />
            )}
            <Flex padding={"10px 16px"}>
              <Flex direction={"column"} mr={6}>
                <Text fontWeight={500}>{`${communityData.id}`}</Text>
                <Text
                  fontWeight={400}
                  fontSize="12px"
                  color={"gray.400"}
                >{`r/${communityData.id}`}</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Header;
