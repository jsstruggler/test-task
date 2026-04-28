import { Button } from '@/components/ui'

interface SuccessModalProps {
  amount: number
  firstName: string
  lastName: string
  onClose: () => void
  termDays: number
}

export const SuccessModal = ({
  amount,
  firstName,
  lastName,
  onClose,
  termDays,
}: SuccessModalProps) => (
  <div
    aria-modal="true"
    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4"
    role="dialog"
  >
    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
      <h2 className="text-xl font-semibold text-slate-950">Заявка одобрена</h2>
      <p className="mt-3 text-sm leading-6 text-slate-700">
        Поздравляем, {lastName} {firstName}. Вам одобрена ${amount} на{' '}
        {termDays} дней.
      </p>
      <div className="mt-6 flex justify-end">
        <Button onClick={onClose} type="button">
          Закрыть
        </Button>
      </div>
    </div>
  </div>
)
