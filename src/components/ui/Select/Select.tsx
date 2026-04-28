import type { SelectHTMLAttributes } from 'react'

export interface SelectOption {
  label: string
  value: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[]
  placeholder: string
}

export const Select = ({
  className = '',
  options,
  placeholder,
  ...props
}: SelectProps) => (
  <select
    className={`h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-sky-700 focus:ring-2 focus:ring-sky-100 ${className}`}
    {...props}
  >
    <option value="">{placeholder}</option>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
)
