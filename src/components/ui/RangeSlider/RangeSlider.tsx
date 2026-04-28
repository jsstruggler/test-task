import type { ChangeEventHandler } from 'react'

interface RangeSliderProps {
  label: string
  max: number
  min: number
  name?: string
  onBlur?: () => void
  onChange?: ChangeEventHandler<HTMLInputElement>
  step: number
  suffix: string
  value?: number
}

export const RangeSlider = ({
  label,
  max,
  min,
  name,
  onBlur,
  onChange,
  step,
  suffix,
  value = min,
}: RangeSliderProps) => (
  <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
    <div className="mb-3 flex items-center justify-between gap-4">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <output className="rounded-md bg-white px-3 py-1 text-sm font-semibold text-slate-950 shadow-sm">
        {value} {suffix}
      </output>
    </div>
    <input
      className="h-2 w-full cursor-pointer accent-sky-700"
      max={max}
      min={min}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      step={step}
      type="range"
      value={value}
    />
    <div className="mt-2 flex justify-between text-xs text-slate-500">
      <span>
        {min} {suffix}
      </span>
      <span>
        {max} {suffix}
      </span>
    </div>
  </div>
)
