import { useEffect, useState } from "react"
import PandaAppsApi, { AppsErrors, AppsResult } from "../api"
import { Box } from "@chakra-ui/react"
import { ApiError } from "../../shared"

const errorMessages: Record<AppsErrors, string> = {
  no_docker: "Docker is not running",
}

export default function InstalledApps() {
  const api = new PandaAppsApi()
  const [appsResult, setAppsResult] = useState<AppsResult | null>(null)

  useEffect(() => {
    api.listInstalledApps().then((result) => {
      console.log("got apps result", result)
      setAppsResult(result)
    })
  }, [])

  if (appsResult === null) return null
  if ("Err" in appsResult)
    return (
      <ApiError
        activity="fetching apps"
        description={errorMessages[appsResult.Err]}
        errorName={appsResult.Err}
      />
    )

  const apps = appsResult.Ok

  return (
    <Box>
      <h1>Installed Apps</h1>
      <div>{apps}</div>
    </Box>
  )
}
