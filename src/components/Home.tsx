import React from 'react';
import { Box } from '@chakra-ui/react';
import ImageCycler from './ImageCycler';

function Home() {
  return (
    <Box>
      <ImageCycler interval={5000} />
    </Box>
  );
}

export default Home;
