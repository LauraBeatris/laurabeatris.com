import { PopoverProps as ChakraPopoverProps } from '@chakra-ui/react'

export type PopoverProps = ChakraPopoverProps & {
  popoverTextElement: JSX.Element;
  buttonContent: React.ReactNode,
}
