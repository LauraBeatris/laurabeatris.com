import { Flex, HStack, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { ChangeEvent } from 'react'
import { MenuOptionGroupProps } from '@chakra-ui/menu'

type ProjectFiltersProps = MenuOptionGroupProps & {
  onTitleInputChange: (event: ChangeEvent) => void;
}

const inputGroupCss = {
  margin: '0 !important'
}

const inputCss = {
  '&:hover': { borderColor: 'initial' }
}

export function ProjectFilters ({
  onTitleInputChange
}: ProjectFiltersProps) {
  // const isFetching = useIsFetching([GET_PROJECTS_QUERY_KEY])

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
    </HStack>
  )
}
