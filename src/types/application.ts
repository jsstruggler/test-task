export type Gender = 'male' | 'female'

export interface PersonalData {
  phone: string
  firstName: string
  lastName: string
  gender: Gender
}

export interface WorkData {
  workplace: string
  address: string
}

export interface LoanData {
  amount: number
  termDays: number
}

export interface ApplicationFormData {
  personal?: PersonalData
  work?: WorkData
  loan?: LoanData
}

export type ApplicationFormSection = keyof ApplicationFormData

export type ApplicationFormSectionData<
  Section extends ApplicationFormSection,
> = NonNullable<ApplicationFormData[Section]>

export interface PersonalFormValues {
  phone: string
  firstName: string
  lastName: string
  gender: Gender
}

export interface WorkFormValues {
  workplace: string
  address: string
}

export interface LoanFormValues {
  amount: number
  termDays: number
}
