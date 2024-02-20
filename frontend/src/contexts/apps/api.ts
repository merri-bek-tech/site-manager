const defaultHeaders = {
  "Content-Type": "application/json",
}

const default_host = "/admin_backend"
function getApiHost(path: string | undefined): string {
  const base_url: string = import.meta.env.VITE_API_HOST || "/admin_backend"
  return base_url + path
}

class PandaAppsApi {
  base_url: string

  constructor(base_url?: string) {
    this.base_url = base_url || getApiHost("/apps")
  }

  listInstalledApps() {
    fetch(`${this.base_url}/installed`, {
      method: "GET",
      headers: defaultHeaders,
    }).then((result) => console.log("result", result))
  }
}

export default PandaAppsApi
