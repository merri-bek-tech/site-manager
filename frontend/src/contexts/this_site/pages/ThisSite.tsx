import { Container } from "@chakra-ui/react"
import { useState } from "react"

import NewSiteName from "../components/NewSiteName"
import { SiteDetails } from "../types"
import FindBioregion from "../components/FindBioregion"

type SiteStep = "set_name" | "find_bioregion"

function getStep(siteDetails: SiteDetails): SiteStep {
  if (!siteDetails.name) {
    return "set_name"
  }
  return "find_bioregion"
}

export default function () {
  const [siteDetails, setSiteDetails] = useState({ name: "" })
  function updateSite(site: SiteDetails) {
    console.log(site)
    setSiteDetails(site)
  }

  const setSiteName = (name: string) =>
    updateSite({ ...siteDetails, ...{ name: name } })

  const step: SiteStep = getStep(siteDetails)

  return (
    <Container maxWidth={"2xl"}>
      {step == "set_name" && <NewSiteName setSiteName={setSiteName} />}
      {step == "find_bioregion" && <FindBioregion />}
    </Container>
  )
}
