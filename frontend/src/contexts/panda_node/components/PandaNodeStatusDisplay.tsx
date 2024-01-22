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
  Button,
} from "@chakra-ui/react"
import deepseaPanda from "../../../assets/deepsea-panda.svg"

export interface PandaStatus {
  state: "offline" | "running" | "unknown"
}

export interface PandaNodeControl {
  stop: () => void
}

function colorSchemeForState(state: PandaStatus["state"]): string {
  switch (state) {
    case "offline":
      return "red"
    case "running":
      return "green"
    case "unknown":
      return "gray"
  }
}

export default function PandaNodeStatusDisplay({
  status,
  control,
}: {
  status: PandaStatus
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
            <Badge colorScheme={colorSchemeForState(status.state)}>
              {status.state}
            </Badge>
          </HStack>
          <Box>
            {status.state === "running" && (
              <Button size="sm" colorScheme="orange" onClick={control.stop}>
                Stop
              </Button>
            )}
          </Box>
        </CardBody>
      </Card>
    </VStack>
  )
}
