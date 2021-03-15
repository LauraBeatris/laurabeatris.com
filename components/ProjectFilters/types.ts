import { MenuOptionGroupProps } from '@chakra-ui/menu'

import { Dispatch, SetStateAction } from 'react'

import { TransformedStack } from 'graphql/schema'

export type ProjectFiltersProps = MenuOptionGroupProps & {
  setTitle: Dispatch<SetStateAction<string>>;
  transformedStack: TransformedStack
}
