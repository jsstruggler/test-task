import type { ReactNode } from 'react'
import { useCallback, useMemo, useState } from 'react'

import type {
  ApplicationFormData,
  ApplicationFormSection,
  ApplicationFormSectionData,
} from '@/types/application'

import { ApplicationFormContext } from './ApplicationFormContext'

interface ApplicationFormProviderProps {
  children: ReactNode
}

export const ApplicationFormProvider = ({
  children,
}: ApplicationFormProviderProps) => {
  const [data, setData] = useState<ApplicationFormData>({})

  const updateFormData = useCallback(
    <Section extends ApplicationFormSection>(
      section: Section,
      values: ApplicationFormSectionData<Section>,
    ) => {
      setData(
        (currentData): ApplicationFormData => ({
          ...currentData,
          [section]: values,
        }),
      )
    },
    [],
  )

  const clearApplication = useCallback(() => {
    setData({})
  }, [])

  const value = useMemo(
    () => ({
      clearApplication,
      data,
      updateFormData,
    }),
    [clearApplication, data, updateFormData],
  )

  return (
    <ApplicationFormContext value={value}>{children}</ApplicationFormContext>
  )
}
