import { useEffect, useState } from "react"
import PandaNodeStatusDisplay from "../components/PandaNodeStatusDisplay"
import PandaNodeApi from "../api"
import { NodeStatus } from "../types"

export default function PandaNodeStatus() {
  const api = new PandaNodeApi("http://localhost:8000/panda")
  const [status, setStatus] = useState<NodeStatus>("Unknown")

  useEffect(() => {
    api.status().then((newStatus) => {
      console.log("got new status", newStatus)
      setStatus(newStatus)
    })
  }, [])

  const control = {
    stop: () => api.stop().then(setStatus),
    start: () => api.start().then(setStatus),
  }

  return <PandaNodeStatusDisplay status={status} control={control} />
}
