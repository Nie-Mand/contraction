// Create account : title, bio, avatar, wallet

import { useNavigate } from '@remix-run/react'
import { useState } from 'react'
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

export default function Join() {
  const form = useForm()
  const [loading, setLoading] = useState(false)
  const [create, _loading, error, hash] = useCreateUser()
  const goto = useNavigate()

  async function onSubmit(data: any) {
    setLoading(true)
    const cid = await upload(data.avatar, 'avatar')
    console.log({
      ...data,
      cid,
    })
    const { fullname, bio } = data

    await create({
      fullname,
      bio,
      avatar: cid,
    })
    setLoading(false)
    goto('/')
  }

  return (
    <div className="flex items-center flex-1">
      <div className="bg-gradient-to-b from-red-600 to-red-400 w-80 h-screen fixed top-0 -z-10"></div>
      <div className="w-80"></div>

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

              <div className="flex justify-end">
                <button
                  className="button"
                  disabled={loading || (form.isSubmitted && !form.isValid)}
                >
                  {loading ? 'Submitted' : 'Join'}
                </button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}
