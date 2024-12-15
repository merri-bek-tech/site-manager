import {
  Flex,
  Heading,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react';

import { SiteDataForm } from '../components/SiteDataForm'


export default function () {

  const [siteData, setSiteData] = useState({ name: '' })

  if (siteData == null) {
    return 'Checking site data...'
  }

  function updateSite(site) {
    console.log({ site })
  }

  return <VStack gap={4}>
    <Heading>Hello!</Heading>
    <SiteDataForm siteData={siteData} updateSite={updateSite} />
  </VStack>
}
