import { BaseApi } from "../shared"
import { ApiResult } from "../shared/types"
import { SiteDetails } from "../this_site/types"

export default class ThisSiteApi extends BaseApi {
  getSiteDetails(): Promise<ApiResult> {
    return this.apiCall("this_site")
  }

  setSiteDetails(siteDetails: SiteDetails): Promise<ApiResult> {
    return this.apiCall("this_site/create", "POST", siteDetails)
  }
}
