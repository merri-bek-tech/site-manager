import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <h1>Layout</h1>
      <p>TODO: Add a navigation menu here</p>
      <Outlet />
    </div>
  )
}