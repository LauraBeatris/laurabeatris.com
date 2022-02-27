import { VStack } from '@chakra-ui/react'
import { InferGetStaticPropsType } from 'next'
import { RichText } from '@graphcms/rich-text-react-renderer'

import { Heading } from 'components/Base/Heading'
import { ImageWithCaptions } from 'components/ImageWithCaptions'
import { getAboutMePage } from 'graphql/queries/getAboutMePage'

export const getStaticProps = async () => {
  try {
    const { sections } = await getAboutMePage()

    return {
      props: {
        sections
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)

    return {
      props: {}
    }
  }
}

export default function About ({
  sections
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <VStack
      width='full'
      spacing={10}
      paddingTop={5}
      paddingBottom={10}
      alignItems='flex-start'
    >
      {sections.map(({ id, title, description, images }) => (
        <VStack
          key={id}
          width='full'
          spacing={5}
          alignItems='flex-start'
        >
          <Heading as='h2'>{title}</Heading>
          <RichText content={description.raw} />

          {images.map(({ id, mainCaption, subCaption, asset }) => (
            <ImageWithCaptions
              key={id}
              imageSrc={asset.url}
              subCaption={subCaption}
              mainCaption={mainCaption}
            />
          ))}
        </VStack>
      ))}
    </VStack>
  )
}
