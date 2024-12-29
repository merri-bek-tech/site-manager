import React, { useEffect, useMemo, useState } from "react"
import Api from "../api"
import { Box, Heading } from "@chakra-ui/react"
import { ApiError } from "../../shared"
import AppList from "../components/AppList"
import { ApiResult } from "../../shared/types"

export default function InstalledApps() {
  const [appsResult, setAppsResult] = useState<ApiResult<any, any> | null>(null)

  const api = useMemo(() => new Api(), [])

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
      <ApiError activity="fetching apps" description={appsResult.message} />
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
