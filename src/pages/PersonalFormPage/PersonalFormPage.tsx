import { InputMask } from '@react-input/mask'
import Form from 'rc-field-form'
import { useNavigate } from 'react-router-dom'

import { routePaths } from '@/app/routes'
import { Field } from '@/components/shared'
import { Button, Input, Select } from '@/components/ui'
import { useApplicationForm } from '@/context/useApplicationForm'
import type { PersonalFormValues } from '@/types/application'

import { personalFormRules } from './rules'

// rc-field-form - выбран, чтобы минимизировать количество рендеров в формах.
const genderOptions = [
  { label: 'Мужской', value: 'male' },
  { label: 'Женский', value: 'female' },
]

export const PersonalFormPage = () => {
  const navigate = useNavigate()
  const {
    data: { personal },
    updateFormData,
  } = useApplicationForm()

  const handleFinish = (values: PersonalFormValues) => {
    updateFormData('personal', values)
    navigate('/' + routePaths.work)
  }

  return (
    <Form
      initialValues={personal}
      onFinish={handleFinish}
      validateTrigger="onBlur"
    >
      <div className="grid gap-5">
        <Field
          name="phone"
          rules={personalFormRules.phone}
        >
          <InputMask
            component={Input}
            mask="z___ ___ ___"
            placeholder="0123 456 789"
            replacement={{ _: /\d/, z: /0/ }}
            type="tel"
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            name="firstName"
            rules={personalFormRules.firstName}
          >
            <Input placeholder="Иван" type="text" />
          </Field>

          <Field
            name="lastName"
            rules={personalFormRules.lastName}
          >
            <Input placeholder="Иванов" type="text" />
          </Field>
        </div>

        <Field
          name="gender"
          rules={personalFormRules.gender}
        >
          <Select options={genderOptions} placeholder="Выберите пол" />
        </Field>

        <div className="flex justify-end pt-2">
          <Button type="submit">Далее</Button>
        </div>
      </div>
    </Form>
  )
}
