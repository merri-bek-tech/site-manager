import { Input, Textarea } from "@chakra-ui/react"
import { useForm, SubmitHandler } from "react-hook-form"

import { Field, FormActions, Button, FormFields } from "../../../components"

interface NewRegionData {
  name: string
  description: string
}

export default function NewRegion() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewRegionData>()
  const onSubmit: SubmitHandler<NewRegionData> = (data) => {
    console.log("onSubmit", data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormFields>
        <Field
          label="Region Name"
          helperText={`A name to identify your Region - use lowercase letters and no spaces`}
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

        <Field
          label="Description"
          helperText={`A description of your Region`}
          invalid={!!errors.description}
          errorText={errors.description?.message}
        >
          <Textarea
            {...register("description", {
              maxLength: {
                value: 255,
                message: "Must be less than 255 characters",
              },
            })}
          />
        </Field>
      </FormFields>

      <FormActions>
        <Button loading={isSubmitting} type="submit">
          Create Region
        </Button>
      </FormActions>
    </form>
  )
}
