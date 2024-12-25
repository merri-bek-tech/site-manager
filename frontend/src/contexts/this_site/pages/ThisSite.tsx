import { Container } from "@chakra-ui/react"
import { useState } from "react"

import NewSiteName from "../components/NewSiteName"
import { SiteDetails } from "../types"
import FindBioregion from "../components/FindRegion"

type SiteStep = "set_name" | "find_bioregion"

function getStep(siteDetails: SiteDetails | null): SiteStep {
  if (!siteDetails) {
    return "set_name"
  }
  return "find_bioregion"
}

export default function () {
  const [siteDetails, setSiteDetails] = useState<SiteDetails | null>(null)
  function updateSite(site: SiteDetails) {
    console.log(site)
    setSiteDetails(site)
  }

  const setSiteName = (name: string) =>
    updateSite({ ...siteDetails, ...{ name: name, uuid: "1" } })

  const step: SiteStep = getStep(siteDetails)

  return (
    <Container maxWidth={"2xl"}>
      {step == "set_name" && <NewSiteName setSiteName={setSiteName} />}
      {step == "find_bioregion" && <FindBioregion />}
    </Container>
  )
}
