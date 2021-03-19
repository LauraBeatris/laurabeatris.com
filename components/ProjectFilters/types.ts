import { ChangeEvent } from 'react'
import { MenuOptionGroupProps } from '@chakra-ui/menu'

import { StackCategory, TransformedStack } from 'graphql/schema'

export type ProjectFiltersProps = MenuOptionGroupProps & {
  transformedStack: TransformedStack
  initialCategories: StackCategory[];
  onTitleFilterChange: (event: ChangeEvent) => void;
  onCategoriesFilterChange: (categories: StackCategory | Array<StackCategory>) => void;
}
