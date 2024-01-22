import {
  Stack,
  Heading,
  Image,
  Text,
  Link,
  Card,
  CardBody,
  Badge,
  VStack,
  HStack,
  Box,
} from "@chakra-ui/react"
import deepseaPanda from "../../../assets/deepsea-panda.svg"
import { NodeStatus } from "../types"
import ButtonWithLoading from "./ButtonWithLoading"

export interface PandaNodeControl {
  stop: () => Promise<void>
  start: () => Promise<void>
}

function colorSchemeForState(state: NodeStatus): string {
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
        <Link href="https://p2panda.org/" isExternal>
          P2Panda
        </Link>{" "}
        is the technology we use to send information between Pibashos at
        different locations
      </Text>
      <Card mt={4}>
        <CardBody>
          <HStack>
            <Text>Node status</Text>
            <Box flexGrow={1}>
              <Badge colorScheme={colorSchemeForState(status)}>{status}</Badge>
            </Box>

            <Box>
              {status === "Running" && (
                <ButtonWithLoading
                  size="sm"
                  colorScheme="orange"
                  onClick={control.stop}
                >
                  Stop
                </ButtonWithLoading>
              )}
              {status === "Offline" && (
                <ButtonWithLoading
                  size="sm"
                  colorScheme="green"
                  onClick={control.start}
                >
                  Start
                </ButtonWithLoading>
              )}
            </Box>
          </HStack>
        </CardBody>
      </Card>
    </VStack>
  )
}
