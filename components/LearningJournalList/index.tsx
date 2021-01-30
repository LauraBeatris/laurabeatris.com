import { ListItem } from '@chakra-ui/react'

import { Heading } from 'components/Base/Heading'
import { UnorderedList } from 'components/Base/UnorderedList'

export function LearningJournalList ({ title, list }) {
  const shouldShowLearningJournalList = (list ?? []).length > 0

  if (!shouldShowLearningJournalList) {
    return null
  }

  return (
    <>
      <Heading size='xs'>{title}</Heading>
      <UnorderedList>
        {
          list.map(text => (
            <ListItem key={text}>
              {text}
            </ListItem>
          ))
        }
      </UnorderedList>
    </>
  )
}
