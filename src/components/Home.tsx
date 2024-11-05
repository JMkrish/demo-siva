import React, { useState } from "react";
import { Box, Image, IconButton, Flex, Text, VStack } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useInterval } from "@chakra-ui/react";

import MAIN_IMG_1 from "../assets/images/main1.jpg";
import MAIN_IMG_2 from "../assets/images/main2.jpg";
import MAIN_IMG_3 from "../assets/images/main3.jpg";
import MAIN_IMG_4 from "../assets/images/main4.jpg";
import MAIN_IMG_5 from "../assets/images/main1.png";

// Define image data with titles and descriptions
const images = [
  {
    src: MAIN_IMG_1,
    title: "Welcome to Harvard University",
    description: "Leading the way in global education and research",
  },
  {
    src: MAIN_IMG_2,
    title: "Excellence in Education",
    description: "Shaping tomorrow's leaders today",
  },
  {
    src: MAIN_IMG_3,
    title: "Research & Innovation",
    description: "Pushing the boundaries of knowledge",
  },
  {
    src: MAIN_IMG_4,
    title: "Campus Life",
    description: "A vibrant community of scholars and learners",
  },
  {
    src: MAIN_IMG_5,
    title: "Global Impact",
    description: "Making a difference across the world",
  },
];

interface ImageCyclerProps {
  interval?: number;
}

const Home: React.FC<ImageCyclerProps> = ({ interval = 5000 }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useInterval(() => {
    handleNext();
  }, interval);

  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <Box
      width="100%"
      // height="0"
      paddingBottom="56.25%" // 16:9 aspect ratio (9/16 = 0.5625)
      position="relative"
      overflow="hidden"
    >
      {/* Wrapper to maintain aspect ratio */}
      <Box position="absolute" top="0" left="0" right="0" bottom="0">
        {/* Image Container */}
        <Image
          src={images[currentImageIndex].src}
          alt={`Main image ${currentImageIndex + 1}`}
          objectFit="cover"
          w="100%"
          h="100%"
        />

        {/* Text Overlay */}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="blackAlpha.400"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex="1"
        >
          <VStack spacing={4} px={8} textAlign="center">
            <Text
              color="white"
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="bold"
              textShadow="2px 2px 4px rgba(0,0,0,0.4)"
            >
              {images[currentImageIndex].title}
            </Text>
            <Text
              color="white"
              fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
              textShadow="1px 1px 2px rgba(0,0,0,0.4)"
            >
              {images[currentImageIndex].description}
            </Text>
          </VStack>
        </Box>

        {/* Navigation Arrows */}
        <Flex
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          justify="space-between"
          align="center"
          px={4}
          pointerEvents="none"
          zIndex="2"
        >
          <IconButton
            aria-label="Previous image"
            icon={<ChevronLeftIcon boxSize={8} />}
            onClick={handlePrevious}
            variant="ghost"
            colorScheme="whiteAlpha"
            size="lg"
            color="white"
            bg="blackAlpha.400"
            _hover={{ bg: "blackAlpha.600" }}
            isRound
            pointerEvents="auto"
          />
          <IconButton
            aria-label="Next image"
            icon={<ChevronRightIcon boxSize={8} />}
            onClick={handleNext}
            variant="ghost"
            colorScheme="whiteAlpha"
            size="lg"
            color="white"
            bg="blackAlpha.400"
            _hover={{ bg: "blackAlpha.600" }}
            isRound
            pointerEvents="auto"
          />
        </Flex>

        {/* Image Indicators */}
        <Flex
          position="absolute"
          bottom="4"
          width="100%"
          justify="center"
          gap={2}
          pointerEvents="auto"
          zIndex="2"
        >
          {images.map((_, index) => (
            <Box
              key={index}
              w="2"
              h="2"
              borderRadius="full"
              bg={index === currentImageIndex ? "white" : "whiteAlpha.600"}
              cursor="pointer"
              onClick={() => setCurrentImageIndex(index)}
              _hover={{ bg: "white" }}
            />
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default Home;
