// const PandaNodeApi = {
//   stop: () => {
//     return fetch("/panda/stop", {
//       method: "POST",
//     })
//   },
// }

const defaultHeaders = {
  "Content-Type": "application/json",
}

class PandaNodeApi {
  base_url: string

  constructor(base_url: string) {
    this.base_url = base_url
  }

  stop() {
    return fetch(`${this.base_url}/stop`, {
      method: "POST",
      headers: defaultHeaders,
    })
  }
}

export default PandaNodeApi
