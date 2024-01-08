import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./pages/Layout"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <h1>Home</h1> }
    ]
  },
])

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
