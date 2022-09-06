import { Button, Flex, HStack, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup } from '@chakra-ui/react'
import { Search2Icon, SettingsIcon } from '@chakra-ui/icons'
import useSound from 'use-sound'
import { ChangeEvent } from 'react'
import { MenuOptionGroupProps } from '@chakra-ui/menu'

import { INITIAL_STACK_CATEGORIES } from 'components/ProjectsList'
import { gradients } from 'styles/theme/gradients'
import { StackCategory } from '__generated__/graphql/schema'

import menuOpenSound from '../../../public/sounds/menu-open.mp3'

type ProjectFiltersProps = MenuOptionGroupProps & {
  stackCategories: StackCategory[],
  selectedStackCategories: StackCategory[],
  onTitleInputChange: (event: ChangeEvent) => void;
  onStackCategoryOptionsChange: (categories: StackCategory | Array<StackCategory>) => void;
}

const projectFiltersBackgroundCss = {
  backgroundColor: 'var(--project-filters-background-color)'
}

const projectFiltersColorCss = {
  color: 'var(--project-filters-color)'
}

const inputGroupCss = {
  margin: '0 !important'
}

const inputCss = {
  '&:hover': { borderColor: 'initial' }
}

export function ProjectFilters ({
  stackCategories,
  onTitleInputChange,
  selectedStackCategories,
  onStackCategoryOptionsChange,
  ...rest
}: ProjectFiltersProps) {
  const [play] = useSound(menuOpenSound, { volume: 0.2 })
  // const isFetching = useIsFetching([GET_PROJECTS_QUERY_KEY])

  const handleClick = () => {
    play()
  }

  const filters = [
    {
      title: 'Categories',
      items: stackCategories
    }
  ]

  return (
    <HStack
      flex={1}
      spacing={2}
      minWidth={['100%', '100%', 'initial']}
      maxWidth={[null, null, '60%']}
      alignItems='center'
    >
      <Flex
        width='5%'
        marginRight={2}
        display={['none', null, 'initial']}
      >
        {/* {
          isFetching
            ? <Spinner size='sm' />
            : null
        } */}
      </Flex>

      <InputGroup flex={1} css={inputGroupCss}>
        <InputLeftElement pointerEvents='none'>
          <Search2Icon color='gray.300' />
        </InputLeftElement>
        <Input
          css={inputCss}
          type='text'
          onChange={onTitleInputChange}
          placeholder='Search for project title'
        />
      </InputGroup>

      <Menu closeOnSelect={false} {...rest}>
        <MenuButton
          as={Button}
          color='white.100'
          padding={3}
          display='flex'
          variant='unstyled'
          onClick={handleClick}
          leftIcon={<SettingsIcon display='flex' />}
          bgGradient={gradients.greenToBlue}
          alignItems='center'
          justifyContent='center'
        >
          Filters
        </MenuButton>

        <MenuList css={projectFiltersBackgroundCss}>
          {
            filters.map(({ title, items }) => (
              <MenuOptionGroup
                key={title}
                title={title}
                type='checkbox'
                value={selectedStackCategories}
                bgClip='text'
                onChange={onStackCategoryOptionsChange}
                bgGradient={gradients.greenToBlue}
                defaultValue={INITIAL_STACK_CATEGORIES}
              >
                {
                  items.map((item) => (
                    <MenuItemOption
                      key={item}
                      css={projectFiltersColorCss}
                      value={item}
                    >
                      {item}
                    </MenuItemOption>
                  ))
                }
              </MenuOptionGroup>
            ))
          }
        </MenuList>
      </Menu>
    </HStack>
  )
}
