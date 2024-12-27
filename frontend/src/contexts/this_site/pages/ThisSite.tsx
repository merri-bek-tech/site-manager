import { Container } from "@chakra-ui/react"
import { use, useEffect, useState } from "react"

import NewSiteName from "../components/NewSiteName"
import { SiteDetails } from "../types"
import FindBioregion from "../components/FindRegion"
import ThisSiteApi from "../api"
import { ApiResult } from "../../shared/types"

type SiteStep = null | "set_name" | "find_bioregion"

function getStep(siteDetails: SiteDetails | null): SiteStep {
  if (!siteDetails) {
    return "set_name"
  }
  return "find_bioregion"
}

const api = new ThisSiteApi()

export default function () {
  const [site, setSite] = useState<SiteDetails | null>(null)
  const [step, setStep] = useState<SiteStep>(null)

  const updateSite = (site: SiteDetails) => {
    console.log("Updating site", site)
    setSite(site)
    setStep(getStep(site))
  }

  useEffect(() => {
    api.show().then((result: ApiResult<SiteDetails, any>) => {
      if ("Ok" in result) updateSite(result.Ok)
    })
  }, [])

  const setSiteName = (name: string) => {
    api.create(name).then((result: ApiResult<SiteDetails, any>) => {
      if ("Ok" in result) updateSite(result.Ok)
    })
  }

  return (
    <Container maxWidth={"2xl"}>
      {step == "set_name" && <NewSiteName setSiteName={setSiteName} />}
      {step == "find_bioregion" && site && <FindBioregion site={site} />}
    </Container>
  )
}
