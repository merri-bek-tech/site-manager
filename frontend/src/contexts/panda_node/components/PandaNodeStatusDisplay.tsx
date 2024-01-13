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
} from "@chakra-ui/react"
import deepseaPanda from "../../../assets/deepsea-panda.svg"

interface PandaStatus {
  state: "offline" | "running" | "unknown"
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
}: {
  status: PandaStatus
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
        </CardBody>
      </Card>
    </VStack>
  )
}
