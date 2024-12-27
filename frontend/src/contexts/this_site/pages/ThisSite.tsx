import { Container } from "@chakra-ui/react"
import { use, useEffect, useState } from "react"

import NewSite, { NewSiteData } from "../components/NewSite"
import { SiteDetails, RegionDetails } from "../types"
import FindRegion from "../components/FindRegion"
import ThisSiteApi from "../api"
import { ApiResult } from "../../shared/types"
import { NewRegionData } from "../components/NewRegion"

type SiteStep = null | "set_name" | "find_bioregion" | "done"

function getStep(
  site: SiteDetails | null,
  region: RegionDetails | null,
): SiteStep {
  if (!site) {
    return "set_name"
  } else if (!region) {
    return "find_bioregion"
  }
  return "done"
}

const api = new ThisSiteApi()

export default function () {
  const [site, setSite] = useState<SiteDetails | null>(null)
  const [region, setRegion] = useState<RegionDetails | null>(null)
  const [step, setStep] = useState<SiteStep>(null)

  const updateSite = (newSite: SiteDetails | null) => {
    console.log("Updating site", site)
    setSite(newSite)
    setStep(getStep(newSite, region))
  }

  const updateRegion = (newRegion: RegionDetails | null) => {
    console.log("Updating region", region)
    setRegion(newRegion)
    setStep(getStep(site, newRegion))
  }

  const fetchSite = () => {
    console.log("EFFECT: fetchSite")
    api.show().then((result: ApiResult<SiteDetails | null, any>) => {
      if ("Ok" in result) updateSite(result.Ok)
    })
  }

  const fetchRegion = () => {
    console.log("EFFECT: fetchRegion")
    api.showRegion().then((result: ApiResult<RegionDetails, any>) => {
      if ("Ok" in result) updateRegion(result.Ok)
    })
  }

  const siteUnknown = step == null

  useEffect(() => {
    if (site == null) fetchSite()
  }, [])
  useEffect(() => {
    if (site != null && region == null) fetchRegion()
  }, [siteUnknown])

  const onSubmitNewSite = (data: NewSiteData) => {
    api.create(data.name).then((result: ApiResult<SiteDetails, any>) => {
      if ("Ok" in result) updateSite(result.Ok)
    })
  }

  const onSubmitNewRegion = (data: NewRegionData) => {
    api
      .createRegion(data.name, data.description)
      .then((result: ApiResult<RegionDetails, any>) => {
        if ("Ok" in result) updateRegion(result.Ok)
      })
  }

  return (
    <Container maxWidth={"2xl"}>
      {step == "set_name" && <NewSite onSubmitNewSite={onSubmitNewSite} />}
      {step == "find_bioregion" && site && (
        <FindRegion site={site} onSubmitNewRegion={onSubmitNewRegion} />
      )}
      {step == "done" && (
        <div>
          <h1>Site created!</h1>
          <p>Site: {site?.name}</p>
          <p>Region: {region?.name}</p>
        </div>
      )}
    </Container>
  )
}
