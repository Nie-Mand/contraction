// Create account : title, bio, avatar, wallet

import { Input, validators, useForm, Form, ConnectWalletInput } from '~/core'
import { useLogin } from '~/services/users'

function limit(str: string) {
  return str.slice(0, 100)
}

export default function Join() {
  const form = useForm()
  const { submit, loading, error } = useLogin()

  function onSubmit() {
    submit()
  }

  return (
    <div className="flex items-center flex-1">
      <div className="bg-gradient-to-b from-red-600 to-red-400 w-4 md:w-80 h-screen fixed top-0 -z-10"></div>
      <div className="w-4 md:w-80"></div>
      <div className="flex-1 grid content-center ">
        <Form onSubmit={onSubmit} form={form}>
          <div className="p-10">
            <h1 className="font-black text-3xl">Login into your Dashboard</h1>

            <div className="py-10 grid content-start gap-4 max-w-xl">
              <ConnectWalletInput name="walletAddress" />
            </div>

            {error && (
              <div className="text-red-500 text-sm">{limit(error)}</div>
            )}

            <div className="flex justify-end">
              <button
                className="button"
                disabled={loading || (form.isSubmitted && !form.isValid)}
              >
                Login
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}
