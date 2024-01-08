import { Box, Flex, useColorModeValue, Stack, Button } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import ColorModeSwitcher from "./ColorModeSwitcher"

export default function Navbar() {
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Stack direction="row" alignItems="center">
            <Box>Pibasho</Box>
            <Box>
              <Link to="/node">
                <Button colorScheme="blue" variant="ghost">
                  Panda Node
                </Button>
              </Link>
            </Box>
          </Stack>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <ColorModeSwitcher />
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
