import React, { useEffect, useMemo, useState } from "react"
import PandaAppsApi, { AppsResult } from "../api"
import { Box, Heading } from "@chakra-ui/react"
import { ApiError } from "../../shared"
import AppList from "../components/AppList"


export default function InstalledApps() {
  const [appsResult, setAppsResult] = useState<AppsResult | null>(null)

  const api = useMemo(() => new PandaAppsApi(), [])

  useEffect(() => {
    api.listInstalledApps().then((result) => {
      console.log("got apps result", { result })
      setAppsResult(result)
    })
  }, [api])

  let inner: React.ReactNode = null

  if (appsResult == null) {
    inner = <div>xxx</div>
  } else if (appsResult instanceof Error) {
    inner = (
      <ApiError
        activity="fetching apps"
        description={appsResult.message}
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
