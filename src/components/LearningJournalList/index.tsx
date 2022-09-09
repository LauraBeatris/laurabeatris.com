import { HeadingProps, List, ListItem, ListProps } from '@chakra-ui/react'

import { Heading } from 'components/Base/Heading'

type LearningJournalListProps = {
  title: string;
  list: Array<string>;
  listSize?: ListProps['size'];
  headingSize?: HeadingProps['size'];
}

export function LearningJournalList ({
  title,
  list,
  listSize,
  headingSize = 'xs'
}: LearningJournalListProps) {
  const shouldShowLearningJournalList = (list ?? []).length > 0

  if (!shouldShowLearningJournalList) {
    return null
  }

  return (
    <>
      <Heading size={headingSize}>
        {title}
      </Heading>
      <List
        spacing={2}
        fontSize={listSize}
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
