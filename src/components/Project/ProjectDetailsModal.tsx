import {
  List,
  Text,
  Modal,
  ListItem,
  ListIcon,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  ModalContent,
  ModalCloseButton
} from '@chakra-ui/react'
import { AiFillTool, AiFillDatabase } from 'react-icons/ai'
import { MdLanguage, MdLibraryBooks } from 'react-icons/md'

import { colors } from 'styles/theme/colors'

function ProjectDetailsListItem ({ icon, title, value }) {
  if (!value) {
    return null
  }

  return (
    <ListItem color='dark'>
      <ListIcon as={icon} color='green.400' />
      <Text as='strong'>{title}:</Text> {value}
    </ListItem>
  )
}

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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent marginX={5} backgroundColor='white.100'>
        <ModalHeader>
          <Text color='dark'>
            {title}
          </Text>
        </ModalHeader>
        <ModalCloseButton css={{ svg: { color: colors.dark } }} />
        <ModalBody>
          <List spacing={3}>
            <ProjectDetailsListItem
              icon={MdLanguage}
              title='Language'
              value={language}
            />

            <ProjectDetailsListItem
              icon={AiFillTool}
              title='Framework'
              value={framework}
            />

            <ProjectDetailsListItem
              icon={MdLibraryBooks}
              title='Libraries'
              value={libraries}
            />

            {
              databases.length > 0
                ? <ProjectDetailsListItem
                    icon={AiFillDatabase}
                    title='Databases'
                    value={databases}
                  />
                : null
            }
          </List>
        </ModalBody>

        <ModalFooter />
      </ModalContent>
    </Modal>
  )
}
