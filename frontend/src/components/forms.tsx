import { HStack, VStack } from "@chakra-ui/react"

export function FormActions({ children }: { children: React.ReactNode }) {
  return (
    <HStack width="100%" gap={4} justifyContent={"flex-end"}>
      {children}
    </HStack>
  )
}

export function FormFields({ children }: { children: React.ReactNode }) {
  return <VStack gap={4}>{children}</VStack>
}
