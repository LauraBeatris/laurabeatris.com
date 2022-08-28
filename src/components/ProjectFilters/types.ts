import { ChangeEvent } from 'react'
import { MenuOptionGroupProps } from '@chakra-ui/menu'

import { StackCategory, TransformedStack } from 'graphql/schema'

export type ProjectFiltersProps = MenuOptionGroupProps & {
  stackCategories: StackCategory[],
  transformedStack: TransformedStack
  onTitleInputChange: (event: ChangeEvent) => void;
  onStackCategoryOptionsChange: (categories: StackCategory | Array<StackCategory>) => void;
}
