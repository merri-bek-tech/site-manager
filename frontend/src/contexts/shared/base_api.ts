import { ApiResult } from "./types"

const headers = {
  "Content-Type": "application/json",
}

//const default_host = "/admin_backend"
function getApiHost(path: string | undefined): string {
  const base_url: string = import.meta.env.VITE_API_HOST || "/api"
  return base_url + path
}

export default class BaseApi {
  base_url: string

  constructor(base_url?: string) {
    this.base_url = base_url || getApiHost("/apps")
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
