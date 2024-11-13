import { useState } from "react"
import { Button } from "../../../components/ui/button"

type ButtonWithLoadingProps = {
  onClick: () => Promise<void>
  size?: "sm" | "md" | "lg"
  colorPalette?: string
  children: React.ReactNode
}

export default function ButtonWithLoading({
  onClick,
  size,
  colorPalette,
  children,
}: ButtonWithLoadingProps) {
  const [loading, setLoading] = useState(false)

  const internalOnClick = () => {
    setLoading(true)
    onClick().finally(() => setLoading(false))
  }

  console.log()

  return (
    <Button
      size={size}
      colorPalette={colorPalette}
      onClick={internalOnClick}
      loading={loading}
      disabled={loading}
    >
      {children}
    </Button>
  )
}
