import { useState } from "react"
import { Button } from "@chakra-ui/react"

type ButtonWithLoadingProps = {
  onClick: () => Promise<void>
  size?: "sm" | "md" | "lg"
  colorScheme?: string
  children: React.ReactNode
}

export default function ButtonWithLoading({
  onClick,
  size,
  colorScheme,
  children,
}: ButtonWithLoadingProps) {
  const [loading, setLoading] = useState(false)

  const internalOnClick = () => {
    setLoading(true)
    onClick().finally(() => setLoading(false))
  }

  return (
    <Button
      size={size}
      colorScheme={colorScheme}
      onClick={internalOnClick}
      isLoading={loading}
    >
      {children}
    </Button>
  )
}
