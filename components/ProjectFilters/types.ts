import { ChangeEvent } from 'react'
import { MenuOptionGroupProps } from '@chakra-ui/menu'

import { TransformedStack } from 'graphql/schema'

export type ProjectFiltersProps = MenuOptionGroupProps & {
  isFetching: boolean;
  transformedStack: TransformedStack
  onTitleFilterChange: (event: ChangeEvent) => void;
  onCategoriesFilterChange: (categories: string | Array<string>) => void;
}
