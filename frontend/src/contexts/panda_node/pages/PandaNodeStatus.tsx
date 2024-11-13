import { useEffect, useMemo, useState } from "react"
import PandaNodeStatusDisplay from "../components/PandaNodeStatusDisplay"
import PandaNodeApi from "../api"
import { NodeStatus } from "../types"

export default function PandaNodeStatus() {
  const api = useMemo(() => new PandaNodeApi(), [])
  const [status, setStatus] = useState<NodeStatus>("Unknown")

  useEffect(() => {
    api.status().then((newStatus) => {
      console.log("got new status", newStatus)
      setStatus(newStatus)
    })

    console.log("env", import.meta.env)
  }, [api])

  const control = {
    stop: () => api.stop().then(setStatus),
    start: () => api.start().then(setStatus),
  }

  return <PandaNodeStatusDisplay status={status} control={control} />
}
