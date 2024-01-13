import { Box, Stack, Heading, Image, Text, Link } from "@chakra-ui/react"
import deepseaPanda from "../../../assets/deepsea-panda.svg"

export default function PandaNodeStatus() {
  return (
    <Box>
      <Heading as="h1">
        <Stack direction="row">
          <Image src={deepseaPanda} boxSize="40px"></Image>
          <Text>P2Panda Node</Text>
        </Stack>
      </Heading>
      <Text>
        <Link href="https://p2panda.org/" isExternal>
          P2Panda
        </Link>{" "}
        is the technology we use to send information between Pibashos in
        different houses.
      </Text>
    </Box>
  )
}
