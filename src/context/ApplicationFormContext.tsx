import { createContext } from 'react'

import type {
  ApplicationFormData,
  ApplicationFormSection,
  ApplicationFormSectionData,
} from '@/types/application'

export interface ApplicationFormContextValue {
  data: ApplicationFormData
  clearApplication: () => void
  updateFormData: <Section extends ApplicationFormSection>(
    section: Section,
    values: ApplicationFormSectionData<Section>,
  ) => void
}

export const ApplicationFormContext =
  createContext<ApplicationFormContextValue | null>(null)
