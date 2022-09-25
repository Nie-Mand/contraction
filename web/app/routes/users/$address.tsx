import { useParams } from '@remix-run/react'
import { Loading, Error } from '~/core'
import { DocCard } from '~/core/Doc'
import { useGetSomeonesData } from '~/services/users'

export default function Profile() {
  const { data, loading, error } = useGetSomeonesData()
  console.log(data, loading, error)

  if (loading) return <Loading />
  if (error) return <Error>{error}</Error>

  return (
    <div className="ctr">
      <div className="relative py-10">
        <div className="bg-slate-100 h-60 w-full rounded-xl"></div>
        <img
          src="https://picsum.photos/200"
          alt="logo"
          className="absolute top-1/2 right-1/2 translate-x-1/2 rounded-full w-40 h-40 mx-auto ring-8 ring-primary ring-offset-4"
        />
      </div>
      <div className="text-center pt-8">
        <h1 className="font-extrabold text-xl">Lorem Ipsum: </h1>
        <h2>Description Description Description Description</h2>
      </div>
      <div className="py-10 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <DocCard />
        <DocCard />
        <DocCard />
      </div>
    </div>
  )
}
