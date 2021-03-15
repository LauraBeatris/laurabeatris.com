import { MenuOptionGroupProps } from '@chakra-ui/menu'

import { TransformedStack } from 'graphql/schema'

export type ProjectsFiltersProps = MenuOptionGroupProps & {
  transformedStack: TransformedStack
}
