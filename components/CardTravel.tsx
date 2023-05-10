import {
  AspectRatio,
  Avatar,
  Box,
  Center,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
} from "native-base";

type Props = {
  title: string;
  subtitle: string;
  description: string;
  travelers: string[];
  image: string;
};

export function CardTravel({
  title,
  subtitle,
  description,
  travelers,
  image,
}: Props) {
  return (
    <Box
      rounded="lg"
      overflow="hidden"
      borderColor="coolGray.200"
      borderWidth="1"
      _dark={{
        borderColor: "coolGray.600",
        backgroundColor: "gray.700",
      }}
      _web={{
        shadow: 2,
        borderWidth: 0,
      }}
      _light={{
        backgroundColor: "gray.50",
      }}
    >
      <Box>
        <AspectRatio w="100%" ratio={16 / 9}>
          <Image
            source={{
              uri: image,
            }}
            alt="image"
          />
        </AspectRatio>
        <Center
          bg="violet.500"
          _dark={{
            bg: "violet.400",
          }}
          _text={{
            color: "warmGray.50",
            fontWeight: "700",
            fontSize: "xs",
          }}
          position="absolute"
          bottom="0"
          px="3"
          py="1.5"
        >
          09/05/23 - 10/05/23
        </Center>
      </Box>
      <Stack p="4" space={3}>
        <Stack space={2}>
          <Heading size="md" ml="-1">
            {title}
          </Heading>
          <Text
            fontSize="xs"
            _light={{
              color: "violet.500",
            }}
            _dark={{
              color: "violet.400",
            }}
            fontWeight="500"
            ml="-0.5"
            mt="-1"
          >
            {subtitle}
          </Text>
        </Stack>
        <Text fontWeight="400">{description}</Text>
        <HStack alignItems="center" space={4} justifyContent="flex-end">
          <Avatar.Group max={3}>
            {travelers &&
              travelers.map((traveler) => <Avatar key={traveler}>SS</Avatar>)}
          </Avatar.Group>
        </HStack>
      </Stack>
    </Box>
  );
}
