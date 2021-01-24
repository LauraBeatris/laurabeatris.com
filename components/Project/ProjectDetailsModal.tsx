import {
  List,
  Text,
  Modal,
  Button,
  ListItem,
  ListIcon,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  ModalContent,
  ModalCloseButton
} from '@chakra-ui/react'
import { AiFillTool, AiFillDatabase } from 'react-icons/ai'
import { MdLanguage, MdLibraryBooks } from 'react-icons/md'

export function ProjectDetailsModal ({
  title,
  stack,
  isOpen,
  onClose
}) {
  const { framework, language } = stack
  const libraries = stack.libraries.join(', ')
  const databases = (stack.databases ?? []).join(', ')

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent marginX={5} backgroundColor='white.100'>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={MdLanguage} color='green.400' />
              <Text as='strong'>Language:</Text> {language}
            </ListItem>
            <ListItem>
              <ListIcon as={AiFillTool} color='green.400' />
              <Text as='strong'>Framework:</Text> {framework}
            </ListItem>
            <ListItem>
              <ListIcon as={MdLibraryBooks} color='green.400' />
              <Text as='strong'>Libraries:</Text> {libraries}
            </ListItem>

            {
              databases.length > 0
                ? (
                  <ListItem>
                    <ListIcon as={AiFillDatabase} color='green.400' />
                    <Text as='strong'>Databases:</Text> {databases}
                  </ListItem>
                  )
                : null
            }
          </List>
        </ModalBody>

        <ModalFooter>
          <Button
            color='white.100'
            onClick={onClose}
            backgroundColor='green.500'
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
