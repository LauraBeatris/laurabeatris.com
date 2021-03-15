import { Button, HStack, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup } from '@chakra-ui/react'
import useSound from 'use-sound'
import { Search2Icon, SettingsIcon } from '@chakra-ui/icons'

import menuOpenSound from 'public/sounds/menu-open.mp3'

import { ProjectFiltersProps } from './types'

const projectFiltersBackgroundCss = {
  backgroundColor: 'var(--project-filters-background-color)'
}

const projectFiltersColorCss = {
  color: 'var(--project-filters-color)'
}

export function ProjectFilters ({
  setTitle,
  transformedStack,
  ...rest
}: ProjectFiltersProps) {
  const [play] = useSound(menuOpenSound, { volume: 0.2 })

  const handleClick = () => {
    play()
  }

  const handleChange = (event) => {
    setTitle(event.target.value)
  }

  const filters = [
    {
      title: 'Categories',
      items: transformedStack.categories
    }
  ]

  return (
    <HStack spacing={2}>
      <InputGroup>
        <InputLeftElement pointerEvents='none'>
          <Search2Icon color='gray.300' />
        </InputLeftElement>
        <Input
          type='text'
          onChange={handleChange}
          placeholder='Search by project title'
        />
      </InputGroup>

      <Menu closeOnSelect={false} {...rest}>
        <MenuButton
          as={Button}
          color='white.100'
          padding={5}
          display='flex'
          variant='unstyled'
          onClick={handleClick}
          flexGrow={1}
          leftIcon={<SettingsIcon display='flex' />}
          bgGradient='linear(to-r, green.400, green.500, blue.100)'
          alignItems='center'
          justifyContent='center'
        >
          Filters
        </MenuButton>
        <MenuList css={projectFiltersBackgroundCss}>
          {filters.map(({ title, items }) => (
            <MenuOptionGroup
              key={title}
              type='checkbox'
              title={title}
              bgClip='text'
              bgGradient='linear(to-r, green.400, green.500, blue.100)'
            >
              {items.map((item) => (
                <MenuItemOption
                  key={item}
                  css={projectFiltersColorCss}
                  value={item}
                >
                  {item}
                </MenuItemOption>
              ))}
            </MenuOptionGroup>
          ))}
        </MenuList>
      </Menu>
    </HStack>
  )
}
