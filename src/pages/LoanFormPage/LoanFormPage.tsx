import Form from 'rc-field-form'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { addProduct } from '@/api/products'
import { routePaths } from '@/app/routes'
import { Field, SuccessModal } from '@/components/shared'
import { Button, RangeSlider } from '@/components/ui'
import { useApplicationForm } from '@/context/useApplicationForm'
import type { LoanFormValues } from '@/types/application'

// rc-field-form - выбран, чтобы минимизировать количество рендеров в формах.
const defaultLoanValues: LoanFormValues = {
  amount: 200,
  termDays: 10,
}

export const LoanFormPage = () => {
  const navigate = useNavigate()
  const {
    clearApplication,
    data: { loan, personal },
    updateFormData,
  } = useApplicationForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [approvedLoan, setApprovedLoan] = useState<LoanFormValues | null>(null)

  const handleFinish = async (values: LoanFormValues) => {
    if (!personal) {
      navigate('/' + routePaths.personal)
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)
    updateFormData('loan', values)

    try {
      await addProduct({
        title: `${personal.firstName} ${personal.lastName}`,
      })
      setApprovedLoan(values)
      setIsSuccessModalOpen(true)
    } catch {
      setSubmitError('Заявка не одобрена. Попробуйте позже.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCloseModal = () => {
    setIsSuccessModalOpen(false)
    clearApplication()
    navigate('/' + routePaths.personal)
  }

  const initialValues = loan ?? defaultLoanValues

  return (
    <>
      <Form
        initialValues={initialValues}
        onFinish={handleFinish}
        validateTrigger="onChange"
      >
        <div className="grid gap-5">
          <Field
            getValueFromEvent={(event: React.ChangeEvent<HTMLInputElement>) =>
              Number(event.target.value)
            }
            name="amount"
            rules={[{ message: 'Выберите сумму займа.', required: true }]}
          >
            <RangeSlider
              label="Сумма"
              max={1000}
              min={200}
              step={100}
              suffix="$"
            />
          </Field>

          <Field
            getValueFromEvent={(event: React.ChangeEvent<HTMLInputElement>) =>
              Number(event.target.value)
            }
            name="termDays"
            rules={[{ message: 'Выберите срок займа.', required: true }]}
          >
            <RangeSlider
              label="Срок"
              max={30}
              min={10}
              step={1}
              suffix="дней"
            />
          </Field>

          {submitError ? (
            <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {submitError}
            </div>
          ) : null}

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-between">
            <Button
              disabled={isSubmitting}
              onClick={() => navigate('/' + routePaths.work)}
              type="button"
              variant="secondary"
            >
              Назад
            </Button>
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? 'Отправка...' : 'Подать заявку'}
            </Button>
          </div>
        </div>
      </Form>

      {isSuccessModalOpen && personal && approvedLoan ? (
        <SuccessModal
          amount={approvedLoan.amount}
          firstName={personal.firstName}
          lastName={personal.lastName}
          onClose={handleCloseModal}
          termDays={approvedLoan.termDays}
        />
      ) : null}
    </>
  )
}
