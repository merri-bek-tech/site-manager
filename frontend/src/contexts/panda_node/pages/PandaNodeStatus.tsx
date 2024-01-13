import { useEffect } from "react"
import PandaNodeStatusDisplay from "../components/PandaNodeStatusDisplay"

export default function PandaNodeStatus() {
  useEffect(() => {
    fetch("http://localhost:8000/panda/frodo")
      .then((res) => res.json())
      .then((data) => console.log(data))
  })

  return <PandaNodeStatusDisplay status={{ state: "unknown" }} />
}
