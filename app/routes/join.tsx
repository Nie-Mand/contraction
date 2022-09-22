// Create account : title, bio, avatar, wallet

import { Input, validators, useForm, Form, ConnectWalletInput } from '~/core'

export default function Join() {
  const form = useForm()

  function onSubmit(data: any) {
    console.log(data)
  }

  return (
    <div className="flex items-center flex-1">
      <div className="bg-indigo-500 h-full-no-nav w-80"></div>

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

              <ConnectWalletInput name="walletAddress" />

              <div className="flex justify-end">
                <button className="button">Join</button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}