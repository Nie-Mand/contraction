// Create account : title, bio, avatar, wallet

import {
  Input,
  validators,
  useForm,
  Form,
  ConnectWalletInput,
  FileInput,
} from '~/core'

export default function NewDoc() {
  const form = useForm()

  function onSubmit(data: any) {
    console.log(data)
  }

  return (
    <div className="flex items-center flex-1">
      <div className="bg-gradient-to-b from-red-600 to-red-400 w-80 h-screen fixed top-0 -z-10"></div>
      <div className="w-80"></div>

      <div className="flex-1 grid content-center ">
        <Form onSubmit={onSubmit} form={form}>
          <div className="p-10">
            <h1 className="font-black text-3xl">Upload new Document</h1>

            <div className="py-10 grid content-start gap-4 max-w-xl">
              <Input
                name="label"
                label="Label"
                validations={[validators.required, validators.notJustSpaces]}
              />
              <Input
                name="to"
                label="To be delivered to"
                validations={[validators.required, validators.notJustSpaces]}
              />

              <Input
                name="validFrom"
                label="Valid starting from"
                type="date"
                validations={[validators.required, validators.notJustSpaces]}
              />

              <Input
                name="validTill"
                label="Valid Till"
                type="date"
                validations={[validators.required, validators.notJustSpaces]}
              />

              <Input
                name="revokeRight"
                label="Own the right to revoke the document"
                type="text"
                validations={[validators.required, validators.notJustSpaces]}
              />

              <Input
                name="renewalRight"
                label="Own the right to Renew the validity of the document"
                type="text"
                validations={[validators.required, validators.notJustSpaces]}
              />

              <Input
                name="fees"
                label="Set Fees for Aquiring the Document"
                type="text"
                validations={[validators.required, validators.number]}
              />

              <FileInput
                name="document"
                label="Document (PDF)"
                accept="application/pdf"
                validations={[validators.required, validators.notJustSpaces]}
              />

              <div className="flex justify-end">
                <button className="button">Create</button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}
