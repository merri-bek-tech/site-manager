import { Flex, VStack, Input, Button } from "@chakra-ui/react"
import { useState, useEffect } from "react"

import { Field } from "../../../components/ui/field"
import { Alert } from "../../../components/ui/alert"
import { SiteData } from "../types"

const appName = "SiteOfHand"

type UpdateSiteFunc = (siteData: SiteData) => void

function SiteDataForm({
  siteData,
  updateSite,
}: {
  siteData: SiteData
  updateSite: UpdateSiteFunc
}) {
  const { name } = siteData

  const [newName, setNewName] = useState("")
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setNewName(name)
  }, [siteData])

  function updateName(event: React.ChangeEvent<HTMLInputElement>) {
    setNewName(event.target.value)
  }

  function saveNewName() {
    updateSite({ name: newName })
    setSaved(true)
  }

  return (
    <>
      {name == "" && (
        <p>
          It looks like you haven't configured {appName} before - let's do that
          now.
        </p>
      )}

      {saved && <Alert status="info" title="Site name saved." />}

      <Field
        label="Site Name"
        helperText={`A name to identify your ${appName} site - use lowercase letters and no spaces`}
      >
        <Input value={newName} onChange={updateName} />
      </Field>
      <Flex mt={2} justify="flex-end" width="100%">
        <Button onClick={saveNewName}>Save</Button>
      </Flex>
    </>
  )
}

export { SiteDataForm }
