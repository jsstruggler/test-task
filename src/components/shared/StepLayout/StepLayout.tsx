import clsx from 'clsx'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { routePaths } from '@/app/routes'
import { useApplicationForm } from '@/context/useApplicationForm'

interface StepDetails {
  description: string
  label: string
}

const ApplicationStep = {
  Loan: 'loan',
  Personal: 'personal',
  Work: 'work',
} as const

type ApplicationStep = (typeof ApplicationStep)[keyof typeof ApplicationStep]

const stepsOrder: ApplicationStep[] = [
  ApplicationStep.Personal,
  ApplicationStep.Work,
  ApplicationStep.Loan,
]

const loanPath = '/' + routePaths.loan
const personalPath = '/' + routePaths.personal
const workPath = '/' + routePaths.work

const stepByPath: Record<string, ApplicationStep> = {
  [loanPath]: ApplicationStep.Loan,
  [personalPath]: ApplicationStep.Personal,
  [workPath]: ApplicationStep.Work,
}

const stepDetailsByStep: Record<ApplicationStep, StepDetails> = {
  [ApplicationStep.Loan]: {
    description: 'Выберите сумму и срок займа перед отправкой заявки.',
    label: 'Параметры займа',
  },
  [ApplicationStep.Personal]: {
    description: 'Заполните контакты и базовую информацию о заявителе.',
    label: 'Личные данные',
  },
  [ApplicationStep.Work]: {
    description: 'Укажите место работы и адрес проживания.',
    label: 'Адрес и работа',
  },
}

export const StepLayout = () => {
  const { pathname } = useLocation()
  const {
    data: { personal, work },
  } = useApplicationForm()

  if (pathname !== personalPath && !personal) {
    return <Navigate replace to={personalPath} />
  }

  if (pathname === loanPath && !work) {
    return <Navigate replace to={workPath} />
  }

  const currentStep = stepByPath[pathname] ?? ApplicationStep.Personal
  const currentStepIndex = stepsOrder.indexOf(currentStep)
  const currentStepNumber = currentStepIndex + 1
  const { description, label } = stepDetailsByStep[currentStep]

  return (
    <main className="flex min-h-svh items-center justify-center px-4 py-8 sm:px-6">
      <section className="w-full max-w-2xl rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-5 sm:px-8">
          <div className="mb-5 flex gap-2">
            {stepsOrder.map((step, index) => {
              const { label } = stepDetailsByStep[step]
              const isActive = step === currentStep
              const isCompleted = index < currentStepIndex

              return (
                <div className="flex min-w-0 flex-1 flex-col gap-2" key={step}>
                  {/* clsx - так проще и понятнее прокидывать условные классы в компоненты. */}
                  <div
                    className={clsx(
                      'h-1.5 rounded-full',
                      isActive || isCompleted ? 'bg-sky-700' : 'bg-slate-200',
                    )}
                  />
                  <span
                    className={clsx(
                      'truncate text-xs',
                      isActive
                        ? 'font-semibold text-sky-800'
                        : 'text-slate-500',
                    )}
                  >
                    {label}
                  </span>
                </div>
              )
            })}
          </div>
          <p className="text-sm font-medium text-sky-800">
            Шаг {currentStepNumber} из {stepsOrder.length}
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-950 sm:text-3xl">
            {label}
          </h1>
          <p className="mt-2 text-sm text-slate-600">{description}</p>
        </div>
        <div className="px-5 py-6 sm:px-8">
          <Outlet />
        </div>
      </section>
    </main>
  )
}
