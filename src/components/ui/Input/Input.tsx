import type { ComponentPropsWithRef } from 'react'

type InputProps = ComponentPropsWithRef<'input'>

export const Input = ({ className = '', ref, ...props }: InputProps) => (
  <input
    className={`h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-sky-700 focus:ring-2 focus:ring-sky-100 ${className}`}
    ref={ref}
    {...props}
  />
)
