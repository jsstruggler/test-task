import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
}

const variantClassNames: Record<ButtonVariant, string> = {
  primary:
    'border-sky-700 bg-sky-700 text-white shadow-sm hover:border-sky-800 hover:bg-sky-800 focus-visible:outline-sky-700 disabled:border-slate-300 disabled:bg-slate-300',
  secondary:
    'border-slate-300 bg-white text-slate-800 shadow-sm hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-slate-500 disabled:text-slate-400',
}

export const Button = ({
  children,
  className = '',
  variant = 'primary',
  ...props
}: ButtonProps) => (
  <button
    className={`inline-flex h-11 items-center justify-center rounded-md border px-5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed ${variantClassNames[variant]} ${className}`}
    {...props}
  >
    {children}
  </button>
)
