import { useField, Formiz, type FieldProps } from '@formiz/core'
import { type HTMLInputTypeAttribute, useMemo } from 'react'
import { required as requiredValidator } from './validators'
export * as validators from './validators'
export { useForm } from '@formiz/core'

export function ConnectWalletInput(props: Props) {
  const { errorMessage, isValid, setValue, value, id, isSubmitted } =
    useField(props)

  const error = useMemo(() => !isValid && isSubmitted, [isValid, isSubmitted])
  const required = useMemo(
    () => props.validations?.some(v => v.message === requiredValidator.message),
    [props.validations]
  )

  return (
    <div className="grid gap-2">
      <label htmlFor="" className="font-bold capitalize text-sm">
        {props.label} {!!required && ' *'}
      </label>
      <button
        type="button"
        className="button bg-metamask-light hover:bg-metamask-less-light focus:ring-metamask-white"
      >
        Connect Wallet
      </button>
      {error ? (
        <span className="text-red-500 text-xs">{errorMessage}</span>
      ) : null}
    </div>
  )
}

export function Input(props: Props) {
  const { errorMessage, isValid, setValue, value, id, isSubmitted } =
    useField(props)

  const error = useMemo(() => !isValid && isSubmitted, [isValid, isSubmitted])
  const required = useMemo(
    () => props.validations?.some(v => v.message === requiredValidator.message),
    [props.validations]
  )

  return (
    <div className="grid gap-2">
      <label htmlFor="" className="font-bold capitalize text-sm">
        {props.label} {!!required && ' *'}
      </label>
      <input
        id={id}
        type={props.type ?? 'text'}
        name={props.name}
        value={value ?? ''}
        placeholder={props.placeholder}
        className="flex items-center border rounded p-2 text-sm focus-within:ring focus-within:ring-primary focus-within:ring-opacity-50 duration-200 focus:outline-none flex-1 disabled:opacity-40 font-normal"
        disabled={props.disabled}
        onChange={e => setValue(e.target.value)}
      />
      {error ? (
        <span className="text-red-500 text-xs">{errorMessage}</span>
      ) : null}
    </div>
  )
}

interface Props extends FieldProps {
  type?: HTMLInputTypeAttribute | 'select' | 'textarea'
  label?: string
  options?: { key: string; label: string }[]
  rows?: number
  className?: string
  placeholder?: string
  disabled?: boolean
}

interface FormProps {
  children: React.ReactNode
  form: any
  onSubmit: (data: any) => void
}
export function Form(props: FormProps) {
  return (
    <Formiz connect={props.form} onValidSubmit={props.onSubmit}>
      <form noValidate onSubmit={props.form.submit}>
        {props.children}
      </form>
    </Formiz>
  )
}
