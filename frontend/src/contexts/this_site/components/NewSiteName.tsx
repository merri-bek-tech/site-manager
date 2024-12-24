import { Flex, Text, Input, VStack } from "@chakra-ui/react"
import { useForm, SubmitHandler } from "react-hook-form"

import { Field } from "../../../components/ui/field"
import { SiteData } from "../types"
import { Button } from "../../../components/ui/button"

type UpdateSiteFunc = (siteData: SiteData) => void

interface NewSiteNameData {
  name: string
}

export default function NewSiteName({
  siteData,
  updateSite,
}: {
  siteData: SiteData
  updateSite: UpdateSiteFunc
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewSiteNameData>()
  const onSubmit: SubmitHandler<NewSiteNameData> = (data) => console.log(data)

  // const { name } = siteData

  // const [newName, setNewName] = useState("")
  // const [saved, setSaved] = useState(false)

  // useEffect(() => {
  //   setNewName(name)
  // }, [siteData])

  // function updateName(event: React.ChangeEvent<HTMLInputElement>) {
  //   setNewName(event.target.value)
  // }

  // function saveNewName() {
  //   updateSite({ name: newName })
  //   setSaved(true)
  // }

  return (
    <VStack alignItems={"stretch"} width="100%">
      <VStack alignItems={"flex-start"} textStyle={"xl"} gap={4}>
        <Text>
          Welcome to your new Site - part of a local, resilient, internet.
        </Text>
        <Text>To get setup, you'll need to choose a site name.</Text>
        <Text>
          Ideally this should be unique within your Bioregion, but don't worry,
          you'll have a chance to change it later.
        </Text>
      </VStack>

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack alignItems={"flex-start"} pt={8}>
          <Field
            label="Site Name"
            helperText={`A name to identify your Site - use lowercase letters and no spaces`}
            invalid={!!errors.name}
            errorText={errors.name?.message}
          >
            <Input
              {...register("name", {
                required: "This is required",
                minLength: { value: 4, message: "Minimum length should be 4" },
              })}
            />
          </Field>

          <Flex mt={2} justify="flex-end" width="100%">
            <Button loading={isSubmitting} type="submit">
              Save
            </Button>
          </Flex>
        </VStack>
      </form>
    </VStack>
  )
}
