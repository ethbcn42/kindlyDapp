import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
    ModalBody, ModalCloseButton, useDisclosure, Link,
    IconButton, Box, Button, Text
} from "@chakra-ui/react";
import { BiZoomIn } from "react-icons/bi";

const CharityModal = ({organization}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
      <>
        <IconButton onClick={onOpen} aria-label='See detail info' icon={<BiZoomIn />} />
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{organization.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            {organization.logo && organization.logo.length > 0 &&
                <Box mb={6}
                position="relative"
                minH="260px"
                bgImage={organization.logo?.length > 0 && organization.logo}
                bgPosition="center"
                bgSize="cover"/>}
                <Box p={4}>
                    <Text fontWeight="bold" fontSize="l">
                        <Link href={organization.url} isExternal>{organization.url}</Link>
                    </Text>
                </Box>
                <Text>{organization.description}</Text>
            </ModalBody>
            <ModalFooter>
              <Button  mr={3} onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }

export default CharityModal;