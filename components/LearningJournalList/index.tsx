import { List, ListIcon, ListItem } from '@chakra-ui/react'

import { Heading } from 'components/Base/Heading'

export function LearningJournalList ({ title, list }) {
  const shouldShowLearningJournalList = (list ?? []).length > 0

  if (!shouldShowLearningJournalList) {
    return null
  }

  return (
    <>
      <Heading size='xs'>{title}</Heading>
      <List
        spacing={2}
        styleType='initial'
        paddingLeft={4}
      >
        {
          list.map(text => (
            <ListItem key={text}>
              {text}
            </ListItem>
          ))
        }
      </List>
    </>
  )
}
