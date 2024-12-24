import { Container } from "@chakra-ui/react"
import { useState } from "react"

import NewSiteName from "../components/NewSiteName"
import { SiteData } from "../types"

export default function () {
  const [siteData, setSiteData] = useState({ name: "" })
  function updateSite(site: SiteData) {
    console.log(site)
    setSiteData(site)
  }

  const setSiteName = (name: string) =>
    updateSite({ ...siteData, ...{ name: name } })

  return (
    <Container maxWidth={"2xl"}>
      <NewSiteName setSiteName={setSiteName} />
    </Container>
  )
}
