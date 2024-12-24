import { Container } from "@chakra-ui/react"
import { useState } from "react"

import NewSiteName from "../components/NewSiteName"
import { SiteData } from "../types"
import FindBioregion from "../components/FindBioregion"

type SiteStep = "set_name" | "find_bioregion"

function getStep(siteData: SiteData): SiteStep {
  if (!siteData.name) {
    return "set_name"
  }
  return "find_bioregion"
}

export default function () {
  const [siteData, setSiteData] = useState({ name: "" })
  function updateSite(site: SiteData) {
    console.log(site)
    setSiteData(site)
  }

  const setSiteName = (name: string) =>
    updateSite({ ...siteData, ...{ name: name } })

  const step: SiteStep = getStep(siteData)

  return (
    <Container maxWidth={"2xl"}>
      {step == "set_name" && <NewSiteName setSiteName={setSiteName} />}
      {step == "find_bioregion" && <FindBioregion />}
    </Container>
  )
}
