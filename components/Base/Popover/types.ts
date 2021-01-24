import { PopoverProps as ChakraPopoverProps } from '@chakra-ui/react'

export type PopoverProps = ChakraPopoverProps & {
  popoverText: string;
  buttonContent: React.ReactNode,
}
