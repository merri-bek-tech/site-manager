"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode"

export function Provider(props: ColorModeProviderProps) {
  console.log("defaultSystem", defaultSystem)

  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
