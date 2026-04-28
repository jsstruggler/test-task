import type { Rule } from 'rc-field-form/es/interface'

import type { PersonalFormValues } from '@/types/application'

const phonePattern = /^0\d{3} \d{3} \d{3}$/

export const personalFormRules: Record<keyof PersonalFormValues, Rule[]> = {
  phone: [
    { message: 'Введите телефон.', required: true },
    {
      message: 'Телефон должен быть в формате 0XXX XXX XXX.',
      pattern: phonePattern,
    },
  ],
  firstName: [{ message: 'Введите имя.', required: true, whitespace: true }],
  lastName: [
    {
      message: 'Введите фамилию.',
      required: true,
      whitespace: true,
    },
  ],
  gender: [{ message: 'Выберите пол.', required: true }],
}
