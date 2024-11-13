import {
  Stack,
  Heading,
  Image,
  Text,
  Link,
  Card,
  Badge,
  VStack,
  HStack,
  Box,
} from "@chakra-ui/react"
import deepseaPanda from "../../../assets/deepsea-panda.svg"
import { NodeStatus } from "../types"
import ButtonWithLoading from "./ButtonWithLoading"
import { LuExternalLink } from "react-icons/lu"

export interface PandaNodeControl {
  stop: () => Promise<void>
  start: () => Promise<void>
}

function colorPaletteForState(state: NodeStatus): string {
  switch (state) {
    case "Offline":
      return "red"
    case "Running":
      return "green"
    case "Unknown":
      return "gray"
  }
}

export default function PandaNodeStatusDisplay({
  status,
  control,
}: {
  status: NodeStatus
  control: PandaNodeControl
}) {
  return (
    <VStack alignItems="stretch">
      <Heading as="h1">
        <Stack direction="row">
          <Image src={deepseaPanda} boxSize="40px"></Image>
          <Text>P2Panda Node</Text>
        </Stack>
      </Heading>
      <Text mt={2}>
        <Link href="https://p2panda.org/">
          P2Panda
          <LuExternalLink />
        </Link>{" "}
        is the technology we use to send information between Pibashos at
        different locations
      </Text>
      <Card.Root mt={4}>
        <Card.Body>
          <HStack>
            <Text>Node status</Text>
            <Box flexGrow={1}>
              <Badge colorPalette={colorPaletteForState(status)}>
                {status}
              </Badge>
            </Box>

            <Box>
              {status === "Running" && (
                <ButtonWithLoading
                  size="sm"
                  colorPalette="orange"
                  onClick={control.stop}
                >
                  Stop
                </ButtonWithLoading>
              )}
              {status === "Offline" && (
                <ButtonWithLoading
                  size="sm"
                  colorPalette="green"
                  onClick={control.start}
                >
                  Start
                </ButtonWithLoading>
              )}
            </Box>
          </HStack>
        </Card.Body>
      </Card.Root>
    </VStack>
  )
}
