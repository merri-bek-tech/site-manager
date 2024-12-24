import { Flex, Text, Input, VStack } from "@chakra-ui/react"
import { useForm, SubmitHandler } from "react-hook-form"

import { Field } from "../../../components/ui/field"
import { Button } from "../../../components/ui/button"
import { SiteDetails } from "../types"

type SetSiteNameFunc = (name: string) => void

interface NewSiteNameData {
  name: string
}

export default function NewSiteName({
  setSiteName,
}: {
  setSiteName: SetSiteNameFunc
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewSiteNameData>()
  const onSubmit: SubmitHandler<NewSiteNameData> = (data) => {
    setSiteName(data.name)
  }

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
                maxLength: {
                  value: 50,
                  message: "Must be less than 50 characters",
                },
                pattern: {
                  value: /^[a-z]*$/,
                  message: "Lowercase letters only",
                },
              })}
            />
          </Field>

          <Flex mt={2} justify="flex-end" width="100%">
            <Button loading={isSubmitting} type="submit">
              Set Name
            </Button>
          </Flex>
        </VStack>
      </form>
    </VStack>
  )
}
