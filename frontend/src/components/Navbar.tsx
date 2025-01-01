import {
  Box,
  Flex,
  Stack,
  Button,
  Link as ExternalLink,
} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { ColorModeButton, useColorModeValue } from "./ui/color-mode"

export default function Navbar() {
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Stack direction="row" alignItems="center">
            <Box>
              <Link to="/">Site Manager</Link>{" "}
              <ExternalLink
                variant="underline"
                href={APP_VERSION_URL + "/releases/tag/v" + APP_VERSION}
              >
                v{APP_VERSION}
              </ExternalLink>
            </Box>
            <Box>
              <Link to="/apps">
                <Button colorPalette="blue" variant="ghost">
                  Apps
                </Button>
              </Link>
            </Box>
          </Stack>

          <Flex alignItems={"center"}>
            <Stack direction={"row"}>
              <ColorModeButton />
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
