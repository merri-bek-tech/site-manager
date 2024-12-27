import { Container } from "@chakra-ui/react"
import { useEffect, useState } from "react"

import NewSite, { NewSiteData } from "../components/NewSite"
import { SiteDetails } from "../types"
import FindRegion from "../components/FindRegion"
import ThisSiteApi from "../api"
import { ApiResult } from "../../shared/types"
import { NewRegionData } from "../components/NewRegion"

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

  const updateSite = (site: SiteDetails | null) => {
    console.log("Updating site", site)
    setSite(site)
    setStep(getStep(site))
  }

  useEffect(() => {
    api.show().then((result: ApiResult<SiteDetails | null, any>) => {
      if ("Ok" in result) updateSite(result.Ok)
    })
  }, [])

  const onSubmitNewSite = (data: NewSiteData) => {
    api.create(data.name).then((result: ApiResult<SiteDetails, any>) => {
      if ("Ok" in result) updateSite(result.Ok)
    })
  }

  const onSubmitNewRegion = (data: NewRegionData) => {
    console.log("Creating new region", data)
  }

  return (
    <Container maxWidth={"2xl"}>
      {step == "set_name" && <NewSite onSubmitNewSite={onSubmitNewSite} />}
      {step == "find_bioregion" && site && (
        <FindRegion site={site} onSubmitNewRegion={onSubmitNewRegion} />
      )}
    </Container>
  )
}
