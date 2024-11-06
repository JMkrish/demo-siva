import {
  Container,
  SimpleGrid,
  Box,
  Heading,
  Text,
  List,
  ListItem,
  ListIcon,
  VStack,
} from "@chakra-ui/react";
import { PhoneIcon, CheckCircleIcon } from "@chakra-ui/icons";

export function Footer() {
  return (
    <Container maxW="6xl" py={8}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
        {/* Contact Information */}
        <Box>
          <VStack align="start" spacing={3}>
            <Heading as="h4" size="md" color="white">
              Get In Touch
            </Heading>
            <Text color="white">
              Serigor University 400 East Pratt Street, Baltimore MD 21202
            </Text>
            <Text color="white" display="flex" alignItems="center">
              <PhoneIcon mr={2} /> (617) 495-1000
            </Text>
          </VStack>
        </Box>

        {/* Our Commitment */}
        <Box>
          <VStack align="start" spacing={3}>
            <Heading as="h4" size="md" color="white">
              Our Commitment
            </Heading>
            <Text color="white">
              Serigor University is committed to providing excellence in
              education through:
            </Text>
            <List spacing={2}>
              <ListItem color="white">
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Excellence in Teaching: Delivering world-class education through
                innovative methods
              </ListItem>
              <ListItem color="white">
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Research Leadership: Advancing knowledge across disciplines
              </ListItem>
              <ListItem color="white">
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Global Impact: Creating positive change through education and
                research
              </ListItem>
              <ListItem color="white">
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Inclusive Community: Fostering diversity and belonging
              </ListItem>
              <ListItem color="white">
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Lifelong Learning: Supporting continuous education and growth
              </ListItem>
            </List>
          </VStack>
        </Box>

        {/* Stakeholders */}
        <Box>
          <VStack align="start" spacing={3}>
            <Heading as="h4" size="md" color="white">
              Our Community
            </Heading>
            <Text color="white">
              Serigor's community includes students, faculty, researchers,
              staff, alumni, and partners from around the globe. We serve a
              diverse population of learners, from undergraduate and graduate
              students to professionals seeking continuing education and
              development. Our stakeholders include academic institutions,
              research organizations, industry partners, and the broader global
              community benefiting from our educational resources and research
              initiatives.
            </Text>
          </VStack>
        </Box>
      </SimpleGrid>
    </Container>
  );
}
