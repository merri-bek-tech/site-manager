import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./pages/Layout"
import { ChakraProvider } from "@chakra-ui/react"
import PangaNodeStatus from "./contexts/panda_node"

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "", element: <h1>Home</h1> },
        { path: "node", element: <PangaNodeStatus /> },
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
