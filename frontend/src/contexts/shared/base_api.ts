import { ApiResult, OkResult } from "./types"

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
}

function getApiHost(): string {
  return import.meta.env.VITE_API_HOST || "/api"
}

export default class BaseApi {
  base_url: string

  constructor() {
    this.base_url = getApiHost()
  }

  async apiCall(
    path: string,
    method: string = "GET",
    body?: object,
  ): Promise<ApiResult<any, any>> {
    try {
      const response = await fetch(`${this.base_url}/${path}`, {
        method,
        headers,
        body: (body && JSON.stringify(body)) || undefined,
      })
      return {
        Ok: response.json(),
      }
    } catch (error) {
      console.error("Failed to connect to API: ", error)
      return {
        Err: error,
      }
    }
  }
}
