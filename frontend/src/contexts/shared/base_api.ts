import { ApiResult, OkResult } from "./types"

const headers = {
  "Content-Type": "application/json",
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
    body?: any,
  ): Promise<ApiResult<any, any>> {
    try {
      const response = await fetch(`${this.base_url}/${path}`, {
        method,
        headers,
        body,
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
