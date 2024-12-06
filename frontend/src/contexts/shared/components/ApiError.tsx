import { AlertDescription, AlertTitle, Box } from "@chakra-ui/react"
import { LuCircleAlert } from "react-icons/lu"
import { Alert } from "../../../components/ui/alert"

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
      <LuCircleAlert />
      <Box>
        <AlertTitle>Error {activity}</AlertTitle>
        <AlertDescription>
          {description || `Unknown error: ${errorName}`}
        </AlertDescription>
      </Box>
    </Alert>
  )
}
