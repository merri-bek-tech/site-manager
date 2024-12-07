import { Outlet } from "react-router-dom"
import { Stack, Container } from "@chakra-ui/react"
import Navbar from "../components/Navbar"

export default function Layout() {
  return (
    <Stack h="100vh" w="100vw">
      <Navbar />
      <Container padding={4} centerContent>
        <Outlet />
      </Container>
    </Stack>
  )
}
