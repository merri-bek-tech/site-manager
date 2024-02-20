import { useEffect } from "react"
import PandaAppsApi from "../api"

export default function InstalledApps() {
  const api = new PandaAppsApi()

  useEffect(() => {
    api.listInstalledApps()
  }, [])

  return (
    <div>
      <h1>Installed Apps</h1>
    </div>
  )
}
