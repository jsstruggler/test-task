import Form from 'rc-field-form'
import { useNavigate } from 'react-router-dom'

import { routePaths } from '@/app/routes'
import { Field } from '@/components/shared'
import { Button, Input, Select } from '@/components/ui'
import { useApplicationForm } from '@/context/useApplicationForm'
import { useProductCategories } from '@/hooks/useProductCategories'
import type { WorkFormValues } from '@/types/application'

// rc-field-form - выбран, чтобы минимизировать количество рендеров в формах.
export const WorkFormPage = () => {
  const navigate = useNavigate()
  const {
    data: { work },
    updateFormData,
  } = useApplicationForm()
  const { categories, error, isLoading, refetch } = useProductCategories()

  const handleFinish = (values: WorkFormValues) => {
    updateFormData('work', values)
    navigate('/' + routePaths.loan)
  }

  return (
    <Form
      initialValues={work}
      onFinish={handleFinish}
      validateTrigger="onBlur"
    >
      <div className="grid gap-5">
        <Field
          name="workplace"
          rules={[{ message: 'Выберите место работы.', required: true }]}
        >
          <Select
            disabled={isLoading || Boolean(error)}
            options={categories}
            placeholder={isLoading ? 'Загрузка...' : 'Выберите категорию'}
          />
        </Field>

        {error ? (
          <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <p>{error}</p>
            <Button
              className="mt-3"
              onClick={refetch}
              type="button"
              variant="secondary"
            >
              Повторить
            </Button>
          </div>
        ) : null}

        <Field
          name="address"
          rules={[
            {
              message: 'Введите адрес проживания.',
              required: true,
              whitespace: true,
            },
          ]}
        >
          <Input placeholder="Город, улица, дом" type="text" />
        </Field>

        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-between">
          <Button
            onClick={() => navigate('/' + routePaths.personal)}
            type="button"
            variant="secondary"
          >
            Назад
          </Button>
          <Button disabled={isLoading || Boolean(error)} type="submit">
            Далее
          </Button>
        </div>
      </div>
    </Form>
  )
}
