import { NodeStatus } from "./types"

const defaultHeaders = {
  "Content-Type": "application/json",
}

const default_host = "/admin_backend"
function getApiHost(path: string | undefined): string {
  const base_url: string = import.meta.env.VITE_API_HOST || default_host
  return base_url + path
}

class PandaNodeApi {
  base_url: string

  constructor(base_url?: string) {
    this.base_url = base_url || getApiHost("/panda")
  }

  stop(): Promise<NodeStatus> {
    return fetch(`${this.base_url}/stop`, {
      method: "POST",
      headers: defaultHeaders,
    }).then(this.handleStatusResponse.bind(this))
  }

  start(): Promise<NodeStatus> {
    return fetch(`${this.base_url}/start`, {
      method: "POST",
      headers: defaultHeaders,
    }).then(this.handleStatusResponse.bind(this))
  }

  status(): Promise<NodeStatus> {
    return fetch(`${this.base_url}/status`, {
      method: "GET",
      headers: defaultHeaders,
    }).then(this.handleStatusResponse.bind(this))
  }

  // Private

  private handleStatusResponse(response: Response): Promise<NodeStatus> {
    return response.json().then((json) => {
      return json.status as NodeStatus
    })
  }
}

export default PandaNodeApi
