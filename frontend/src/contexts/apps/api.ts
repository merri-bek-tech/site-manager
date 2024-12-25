import { BaseApi } from "../shared"
import { ApiResult } from "../shared/types"

export default class AppsApi extends BaseApi {
  listInstalledApps(): Promise<ApiResult> {
    return this.apiCall("apps/installed")
  }
}
