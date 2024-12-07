import {
  Flex,
  VStack,
  Input,
  Button,
} from '@chakra-ui/react'
import { Field } from "../../../components/ui/field"
import { useState, useEffect } from 'react'

const appName = 'SiteOfHand'


function SiteDataForm({ siteData, updateSite }) {
  const { name } = siteData

  const [newName, setNewName] = useState('')

  useEffect(() => {
    setNewName(name)
  }, [siteData]);

  function updateName(event) {
    setNewName(event.target.value)
  }

  function saveNewName() {
    updateSite({ name: newName })
  }

  return <>
    {name == '' && (
      <p>It looks like you haven't configured {appName} before - let's do that now.</p>
    )}

    <Field
      label="Site Name"
      helperText={`A name to identify your ${appName} site - use lowercase letters and no spaces`}
    >
      <Input value={newName} onChange={updateName} />
    </Field>
    <Flex mt={2} justify="flex-end" width="100%">
      <Button onClick={saveNewName}>Save</Button>
    </Flex >
  </>
}

export { SiteDataForm }
