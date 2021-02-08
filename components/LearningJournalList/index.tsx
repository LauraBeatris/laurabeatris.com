import { List, ListIcon, ListItem } from '@chakra-ui/react'

import { Heading } from 'components/Base/Heading'
import { GradientCircle } from 'components/GradientCircle'

function LearningJournalListIcon () {
  return (
    <GradientCircle
      minWidth='8px'
      height='8px'
      marginTop={2}
      marginRight={2}
    />
  )
}

export function LearningJournalList ({ title, list }) {
  const shouldShowLearningJournalList = (list ?? []).length > 0

  if (!shouldShowLearningJournalList) {
    return null
  }

  return (
    <>
      <Heading size='xs'>{title}</Heading>
      <List spacing={2}>
        {
          list.map(text => (
            <ListItem display='flex' alignItems='flex-start' key={text}>
              <ListIcon as={LearningJournalListIcon} />
              {text}
            </ListItem>
          ))
        }
      </List>
    </>
  )
}
