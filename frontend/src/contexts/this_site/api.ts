import { BaseApi } from "../shared"
import { ApiResult } from "../shared/types"
import { SiteDetails } from "./types"

export default class ThisSiteApi extends BaseApi {
  getSiteDetails(): Promise<ApiResult<SiteDetails, any>> {
    return this.apiCall("this_site")
  }

  createSite(name: string): Promise<ApiResult<SiteDetails, any>> {
    return this.apiCall("this_site/create", "POST", { name })
  }
}
