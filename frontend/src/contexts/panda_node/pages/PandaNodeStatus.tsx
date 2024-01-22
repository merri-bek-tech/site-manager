import { useEffect } from "react"
import PandaNodeStatusDisplay, {
  PandaStatus,
} from "../components/PandaNodeStatusDisplay"
import PandaNodeApi from "../api"

export default function PandaNodeStatus() {
  useEffect(() => {
    fetch("http://localhost:8000/panda/frodo")
      .then((res) => res.json())
      .then((data) => console.log(data))
  })

  const api = new PandaNodeApi("http://localhost:8000/panda")

  const control = {
    stop: () => api.stop(),
  }

  const status: PandaStatus = {
    state: "running",
  }

  return <PandaNodeStatusDisplay status={status} control={control} />
}
