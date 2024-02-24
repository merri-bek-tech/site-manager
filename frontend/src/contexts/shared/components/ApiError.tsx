import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
} from "@chakra-ui/react"

export default function ApiError({
  activity,
  description,
  errorName,
}: {
  activity: string
  description: string | null
  errorName: string
}) {
  return (
    <Alert status="error">
      <AlertIcon />
      <Box>
        <AlertTitle>Error {activity}</AlertTitle>
        <AlertDescription>
          {description || `Unknown error: ${errorName}`}
        </AlertDescription>
      </Box>
    </Alert>
  )
}
