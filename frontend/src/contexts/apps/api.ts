import { BaseApi } from "../shared"
import { ApiResult } from "../shared/types"

export default class AppsApi extends BaseApi {
  listInstalledApps(): Promise<ApiResult<any, any>> {
    return this.apiCall("apps/installed")
  }
}
