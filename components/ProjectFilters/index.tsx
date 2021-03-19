import { Button, Flex, HStack, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup, Spinner } from '@chakra-ui/react'
import useSound from 'use-sound'
import { Search2Icon, SettingsIcon } from '@chakra-ui/icons'

import { useIsFetching } from 'react-query'

import menuOpenSound from 'public/sounds/menu-open.mp3'

import { GET_PROJECTS_QUERY_KEY } from 'hooks/useProjects'

import { ProjectFiltersProps } from './types'

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
  transformedStack,
  onTitleFilterChange,
  onCategoriesFilterChange,
  ...rest
}: ProjectFiltersProps) {
  const [play] = useSound(menuOpenSound, { volume: 0.2 })
  const isFetching = useIsFetching([GET_PROJECTS_QUERY_KEY])

  const handleClick = () => {
    play()
  }

  const filters = [
    {
      title: 'Categories',
      items: transformedStack.categories
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
        {
          isFetching
            ? <Spinner size='sm' />
            : null
        }
      </Flex>

      <InputGroup flex={1} css={inputGroupCss}>
        <InputLeftElement pointerEvents='none'>
          <Search2Icon color='gray.300' />
        </InputLeftElement>
        <Input
          css={inputCss}
          type='text'
          onChange={onTitleFilterChange}
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
          bgGradient='linear(to-r, green.400, green.500, blue.100)'
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
                type='checkbox'
                title={title}
                bgClip='text'
                onChange={onCategoriesFilterChange}
                bgGradient='linear(to-r, green.400, green.500, blue.100)'
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
