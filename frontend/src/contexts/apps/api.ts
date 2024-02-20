import { ErrorResult, OkResult } from "../shared/types"

const defaultHeaders = {
  "Content-Type": "application/json",
}

const default_host = "/admin_backend"
function getApiHost(path: string | undefined): string {
  const base_url: string = import.meta.env.VITE_API_HOST || "/admin_backend"
  return base_url + path
}

export type AppsResult = ErrorResult<string> | OkResult<string>

class PandaAppsApi {
  base_url: string

  constructor(base_url?: string) {
    this.base_url = base_url || getApiHost("/apps")
  }

  listInstalledApps(): Promise<AppsResult> {
    return fetch(`${this.base_url}/installed`, {
      method: "GET",
      headers: defaultHeaders,
    })
      .then((response: Response) => response.json())
      .then((json: any) => json as ErrorResult<string>)
  }
}

export default PandaAppsApi
