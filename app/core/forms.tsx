import { useField, Formiz, type FieldProps } from '@formiz/core'
import { type HTMLInputTypeAttribute, useMemo } from 'react'
import { required as requiredValidator } from './validators'
import { AiOutlineCloudUpload as UploadIcon } from 'react-icons/ai'
export * as validators from './validators'
export { useForm } from '@formiz/core'

function UploadPlaceholder({ placeholder }: { placeholder: string }) {
  return (
    <div className="rounded-lg border-4 border-dotted p-4 flex flex-col items-center">
      <UploadIcon className="w-14 h-14 text-gray-500" />
      <span className="text-gray-500 font-medium">{placeholder}</span>
    </div>
  )
}

export function FileInput(props: Props) {
  const { errorMessage, isValid, setValue, value, id, isSubmitted } =
    useField(props)

  const error = useMemo(() => !isValid && isSubmitted, [isValid, isSubmitted])
  const required = useMemo(
    () => props.validations?.some(v => v.message === requiredValidator.message),
    [props.validations]
  )
  return (
    <div>
      <label htmlFor={id} className="grid gap-2">
        <span className="font-bold capitalize text-xs">
          {props.label} {!!required && ' *'}
        </span>
        <div
          className={`border rounded p-4 text-xs focus-within:ring focus-within:ring-primary focus-within:ring-opacity-50 duration-200 focus:outline-none flex-1 disabled:opacity-40 font-normal`}
        >
          {value ? (
            'Uploaded'
          ) : (
            <UploadPlaceholder placeholder={props.placeholder || 'Upload'} />
          )}
        </div>
        <input
          className={`hidden`}
          value={value?.filename ?? ''}
          onChange={e => {
            setValue(e.target.files?.[0])
          }}
          id={id}
          type="file"
          accept={props.accept}
          aria-invalid={error}
          aria-required={!!required}
          disabled={props.disabled}
        />
        {error ? (
          <span className="text-red-500 text-xs">{errorMessage}</span>
        ) : null}
      </label>
    </div>
  )
}
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
      <label htmlFor={id} className="font-bold capitalize text-xs">
        {props.label} {!!required && ' *'}
      </label>
      <input
        id={id}
        type={props.type ?? 'text'}
        name={props.name}
        value={value ?? ''}
        placeholder={props.placeholder}
        className="border rounded p-2 text-xs focus-within:ring focus-within:ring-primary focus-within:ring-opacity-50 duration-200 focus:outline-none flex-1 disabled:opacity-40 font-normal"
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
  accept?: string
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
