import { Field as RcField } from 'rc-field-form'
import type { FieldProps as RcFieldProps } from 'rc-field-form/es/Field'
import type { Meta } from 'rc-field-form/es/interface'
import { type ReactElement, type ReactNode, useState } from 'react'

// rc-field-form - выбран, чтобы минимизировать количество рендеров в формах.
type FieldProps<Values = unknown> = Omit<
  RcFieldProps<Values>,
  'children'
> & {
  children: ReactElement
  label?: string
  renderError?: (error: string) => ReactNode
}

const defaultRenderError = (error: string) => (
  <span className="mt-2 block text-sm text-red-600">{error}</span>
)

export const Field = <Values = unknown,>({
  children,
  label,
  onMetaChange,
  renderError = defaultRenderError,
  ...props
}: FieldProps<Values>) => {
  const [meta, setMeta] = useState<Meta | null>(null)
  const error = meta?.touched || meta?.validated ? meta.errors[0] : undefined

  const handleMetaChange: NonNullable<
    RcFieldProps<Values>['onMetaChange']
  > = (nextMeta) => {
    setMeta(nextMeta)
    onMetaChange?.(nextMeta)
  }

  return (
    <label className="block">
      {label ? (
        <span className="mb-2 block text-sm font-medium text-slate-700">
          {label}
        </span>
      ) : null}
      <RcField<Values> {...props} onMetaChange={handleMetaChange}>
        {children}
      </RcField>
      {error ? renderError(error) : null}
    </label>
  )
}
