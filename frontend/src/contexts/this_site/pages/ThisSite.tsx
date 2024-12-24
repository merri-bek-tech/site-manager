import { Container } from "@chakra-ui/react"
import { useState } from "react"

import NewSiteName from "../components/NewSiteName"
import { SiteData } from "../types"

export default function () {
  const [siteData, setSiteData] = useState({ name: "" })

  if (siteData == null) {
    return "Checking site data..."
  }

  function updateSite(site: SiteData) {
    console.log({ site })
  }

  return (
    <Container maxWidth={"2xl"}>
      <NewSiteName siteData={siteData} updateSite={updateSite} />
    </Container>
  )
}
