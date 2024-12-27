import { BaseApi } from "../shared"
import { ApiResult } from "../shared/types"
import { SiteDetails } from "./types"

export default class ThisSiteApi extends BaseApi {
  show(): Promise<ApiResult<SiteDetails, any>> {
    return this.apiCall("this_site")
  }

  create(name: string): Promise<ApiResult<SiteDetails, any>> {
    return this.apiCall("this_site/create", "POST", { name })
  }
}
