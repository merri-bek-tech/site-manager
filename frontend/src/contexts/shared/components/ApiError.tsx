import { Alert } from "../../../components/ui/alert"

export default function ApiError({
  activity,
  description,
  errorName,
}: {
  activity: string
  description: string | null
  errorName?: string
}) {
  return (
    <Alert title={`Error ${activity}`} status="error">
      {description || `Unknown error: ${errorName}`}
    </Alert>
  )
}
