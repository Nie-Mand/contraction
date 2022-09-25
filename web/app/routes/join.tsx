// Create account : title, bio, avatar, wallet

import { useNavigate } from '@remix-run/react'
import { useEffect, useState } from 'react'
import {
  Input,
  validators,
  useForm,
  Form,
  ConnectWalletInput,
  FileInput,
} from '~/core'
import { upload } from '~/services'
import { useCreateUser } from '~/services/users'

function limit(str: string) {
  return str.slice(0, 100)
}

export default function Join() {
  const form = useForm()
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('Join')
  const [submit, _loading, error, hash, done] = useCreateUser()
  const goto = useNavigate()

  console.log({
    _loading,
    error,
    hash,
  })

  useEffect(() => {
    if (done) {
      goto('/login')
    }
  }, [done])

  async function onSubmit(data: any) {
    setLoading(true)
    setStatus('Uploading...')
    const cid = await upload(data.avatar, 'avatar')

    const { fullname, bio } = data

    setStatus('Creating Account...')
    await submit(fullname, bio, cid + '/' + data.avatar.name)

    setStatus('Created')
    setLoading(false)
  }

  return (
    <div className="flex items-center flex-1">
      <div className="bg-gradient-to-b from-red-600 to-red-400 w-4 md:w-80 h-screen fixed top-0 -z-10"></div>
      <div className="w-4 md:w-80"></div>

      <div className="flex-1 grid content-center ">
        <Form onSubmit={onSubmit} form={form}>
          <div className="p-10">
            <h1 className="font-black text-3xl">Join Our Platform</h1>

            <div className="py-10 grid content-start gap-4 max-w-xl">
              <Input
                name="fullname"
                label="Full Name"
                validations={[validators.required, validators.notJustSpaces]}
              />
              <Input
                name="bio"
                label="Description About yourself"
                validations={[validators.required, validators.notJustSpaces]}
              />

              <FileInput
                name="avatar"
                label="Avatar"
                validations={[validators.required]}
              />

              <ConnectWalletInput
                label="Connect your wallet"
                name="walletAddress"
                validations={[validators.required, validators.notJustSpaces]}
              />

              {error && (
                <div className="text-red-500 text-sm">{limit(error)}</div>
              )}

              <div className="flex justify-end">
                <button
                  className="button"
                  disabled={loading || (form.isSubmitted && !form.isValid)}
                >
                  {status}
                </button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}
