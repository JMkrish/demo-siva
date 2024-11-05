import React, { useState } from "react";
import { Box, Image, useInterval } from "@chakra-ui/react";

import MAIN_IMG_1 from "../assets/images/main1.jpg";
import MAIN_IMG_2 from "../assets/images/main2.jpg";
import MAIN_IMG_3 from "../assets/images/main3.jpg";
import MAIN_IMG_4 from "../assets/images/main4.jpg";
import MAIN_IMG_5 from "../assets/images/main1.png";

const images = [MAIN_IMG_1, MAIN_IMG_2, MAIN_IMG_3, MAIN_IMG_4, MAIN_IMG_5];

interface ImageCyclerProps {
  interval?: number;
}

const ImageCycler: React.FC<ImageCyclerProps> = ({ interval = 5000 }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useInterval(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, interval);

  return (
    <Box width="100%" height="100%">
      <Image
        src={images[currentImageIndex]}
        alt={`Main image ${currentImageIndex + 1}`}
        objectFit="cover"
        w="100%"
        h="100%"
              />
    </Box>
  );
};

export default ImageCycler;
