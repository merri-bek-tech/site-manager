import { useEffect, useState } from "react"
import PandaAppsApi, { AppsResult } from "../api"

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
  if ("Err" in appsResult) return <div>Error: {appsResult.Err}</div>

  const apps = appsResult.Ok

  return (
    <div>
      <h1>Installed Apps</h1>
      <div>{apps}</div>
    </div>
  )
}
