export function Loading() {
  return (
    <div className="fixed z-40 inset-0 bg-white grid place-content-center">
      <h1 className="text-lg font-bold">Loading..</h1>
    </div>
  )
}

export function Error({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed z-40 inset-0 bg-white grid place-content-center">
      <h1 className="text-lg font-bold">{children}</h1>
    </div>
  )
}
