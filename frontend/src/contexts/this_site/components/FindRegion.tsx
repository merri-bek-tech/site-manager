import { VStack, Text } from "@chakra-ui/react"
import { SiteDetails } from "../types"

export default function FindRegion({ site }: { site: SiteDetails }) {
  return (
    <VStack alignItems={"stretch"}>
      <Text>
        Now it's time to find a region for your new site,{" "}
        <strong>{site.name}</strong>.
      </Text>
    </VStack>
  )
}
