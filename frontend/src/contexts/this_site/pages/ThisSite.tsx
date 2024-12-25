import { Container } from "@chakra-ui/react"
import { useState } from "react"

import NewSiteName from "../components/NewSiteName"
import { SiteDetails } from "../types"
import FindBioregion from "../components/FindRegion"
import ThisSiteApi from "../api"
import { ApiResult } from "../../shared/types"

type SiteStep = "set_name" | "find_bioregion"

function getStep(siteDetails: SiteDetails | null): SiteStep {
  if (!siteDetails) {
    return "set_name"
  }
  return "find_bioregion"
}

const api = new ThisSiteApi()

export default function () {
  const [siteDetails, setSiteDetails] = useState<SiteDetails | null>(null)
  function updateSite(site: SiteDetails) {
    console.log(site)
    setSiteDetails(site)
  }

  const setSiteName = (name: string) => {
    api.createSite(name).then((result: ApiResult<SiteDetails, any>) => {
      if ("Ok" in result) updateSite(result.Ok)
    })
  }

  const step: SiteStep = getStep(siteDetails)

  return (
    <Container maxWidth={"2xl"}>
      {step == "set_name" && <NewSiteName setSiteName={setSiteName} />}
      {step == "find_bioregion" && <FindBioregion />}
    </Container>
  )
}
