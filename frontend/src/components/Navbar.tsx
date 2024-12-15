import { Box, Flex, Stack, Button } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { ColorModeButton, useColorModeValue } from "./ui/color-mode"

export default function Navbar() {
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Stack direction="row" alignItems="center">
            <Box>
              <Link to="/">Pibasho</Link>
            </Box>
            <Box>
              <Link to="/node">
                <Button colorPalette="blue" variant="ghost">
                  Panda Node
                </Button>
              </Link>
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
