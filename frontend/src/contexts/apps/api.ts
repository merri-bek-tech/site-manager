import { SiteData } from "../this_site/types"

const headers = {
  "Content-Type": "application/json",
}

//const default_host = "/admin_backend"
function getApiHost(path: string | undefined): string {
  const base_url: string = import.meta.env.VITE_API_HOST || "/api"
  return base_url + path
}

export type ApiResult = Error | Object

class Api {
  base_url: string

  constructor(base_url?: string) {
    this.base_url = base_url || getApiHost("/apps")
  }

  listInstalledApps(): Promise<ApiResult> {
    return this.apiCall("installed")
  }

  getSiteData(): Promise<ApiResult> {
    return this.apiCall("this_site")
  }

  setSiteData(siteData: SiteData): Promise<ApiResult> {
    return this.apiCall("this_site/create", "POST", siteData)
  }

  apiCall(path: string, method = "GET", body?: any): Promise<ApiResult> {
    return fetch(`${this.base_url}/${path}`, {
      method,
      headers,
      body,
    })
      .then((response: Response) => response.json())
      .catch((error) => error)
  }
}

export default Api
