import { Flex, SimpleGrid } from '@chakra-ui/react'

import { ContentBox } from 'components/ContentBox'
import { Content } from '__generated__/graphql/schema'

type ContentListProps = {
  contentList: Array<Content>
}

export function ContentList ({ contentList }: ContentListProps) {
  return (
    <SimpleGrid
      as='ul'
      css={{ listStyle: 'none' }}
      width='full'
      spacing={8}
      columns={[1, null, 2]}
    >
      {
        (contentList ?? []).map(({
          url,
          title,
          image,
          subtitle
        }) => {
          const { url: imageUrl } = image

          return (
            <Flex
              as='li'
              key={title}
              width='full'
            >
              <ContentBox
                url={url}
                width='full'
                title={title}
                imageSrc={imageUrl}
                subtitle={subtitle}
              />
            </Flex>
          )
        })
      }
    </SimpleGrid>
  )
}
