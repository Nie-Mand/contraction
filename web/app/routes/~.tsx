import { useEffect, useMemo, useState } from 'react'
import { Loading } from '~/core'
import { DocCard, UnsignedDocCard } from '~/core/Doc'
import { useGetMyData } from '~/services/users'
import { useRedirectIfNotLoggedIn } from '~/services/auth'
import { linkOf } from '~/services/upload'

export default function Profile() {
  const [tab, setTab] = useState<'unsigned' | 'mine' | 'created'>('mine')
  const { data, loading, error } = useGetMyData()

  useRedirectIfNotLoggedIn()
  console.log({
    data,
    loading,
    error,
  })

  // useMemo(() => {
  //   if (data && data.length === 3) {
  //     return {
  //       fullname
  //     }
  //   }
  // }, [data])
  if (loading) return <Loading />
  if (error) return <span>{error}</span>

  return (
    <div className="ctr">
      <div className="relative py-10">
        <div className="bg-slate-100 h-60 w-full rounded-xl"></div>
        <img
          src={linkOf(data ? data?.avatar : '/')}
          alt="logo"
          className="object-cover absolute top-1/2 right-1/2 translate-x-1/2 rounded-full w-40 h-40 mx-auto ring-8 ring-primary ring-offset-4"
        />
      </div>
      <div className="text-center pt-8">
        <h1 className="font-extrabold text-xl">{data?.fullname}</h1>
        <h2>{data?.bio}</h2>
      </div>

      <div className="flex items-center py-6 text-sm space-x-5 font-bold">
        <button
          onClick={() => setTab('created')}
          className={`p-4 ${
            tab === 'created' ? 'bg-slate-300' : 'bg-slate-100'
          } hover:bg-slate-300 duration-200 rounded-md`}
        >
          Created Documents
        </button>
        <button
          onClick={() => setTab('mine')}
          className={`p-4 ${
            tab === 'mine' ? 'bg-slate-300' : 'bg-slate-100'
          } hover:bg-slate-300 duration-200 rounded-md`}
        >
          My Documents
        </button>
        <button
          onClick={() => setTab('unsigned')}
          className={`p-4 ${
            tab === 'unsigned' ? 'bg-slate-300' : 'bg-slate-100'
          } hover:bg-slate-300 duration-200 rounded-md`}
        >
          Unsigned Documents
        </button>
      </div>

      {tab === 'unsigned' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <UnsignedDocCard />
          <UnsignedDocCard />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <DocCard />
          <DocCard />
          <DocCard />
          <DocCard />
        </div>
      )}
    </div>
  )
}
