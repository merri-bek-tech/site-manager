import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./pages/Layout"
import { ChakraProvider } from "@chakra-ui/react"
import { PandaNodeStatus } from "./contexts/panda_node"
import { InstalledApps } from "./contexts/apps"

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "", element: <h1>Home</h1> },
        { path: "node", element: <PandaNodeStatus /> },
        { path: "apps", element: <InstalledApps /> },
      ],
    },
  ],
  {
    basename: "/admin",
  }
)

function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  )
}

export default App
