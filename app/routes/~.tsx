export default function Profile() {
  return (
    <div className="container">
      <div className="relative py-10">
        <div className="bg-slate-100 h-60 w-full rounded-xl"></div>
        <img
          src="https://picsum.photos/200"
          alt="logo"
          className="absolute top-1/2 right-1/2 translate-x-1/2 rounded-full w-40 h-40 mx-auto ring-8 ring-primary ring-offset-4"
        />
      </div>
      <div className="text-center pt-8">
        <h1 className="font-extrabold text-xl">Lorem Ipsum</h1>
        <h2>Description Description Description Description</h2>
      </div>
      <div className="py-10 grid grid-cols-4">
        <div className="rounded-xl border p-10">
          <h1 className="font-extrabold text-lg">Label of the Doc</h1>
        </div>
      </div>
    </div>
  )
}
