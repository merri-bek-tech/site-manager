import React, { useEffect, useMemo, useState } from "react"
import PandaAppsApi, { AppsErrors, AppsResult } from "../api"
import { Box, Heading, Spinner } from "@chakra-ui/react"
import { ApiError } from "../../shared"
import AppList from "../components/AppList"

const errorMessages: Record<AppsErrors, string> = {
  no_docker: "Docker is not running",
}

export default function InstalledApps() {
  const [appsResult, setAppsResult] = useState<AppsResult | null>(null)

  const api = useMemo(() => new PandaAppsApi(), [])

  useEffect(() => {
    api.listInstalledApps().then((result) => {
      console.log("got apps result", result)
      setAppsResult(result)
    })
  }, [api])

  let inner: React.ReactNode = null

  if (appsResult == null) {
    inner = <Spinner />
  } else if ("Err" in appsResult) {
    inner = (
      <ApiError
        activity="fetching apps"
        description={errorMessages[appsResult.Err]}
        errorName={appsResult.Err}
      />
    )
  } else {
    inner = <AppList />
  }

  return (
    <Box>
      <Heading as="h1">Installed Apps</Heading>
      <Box mt={4}>{inner}</Box>
    </Box>
  )
}
