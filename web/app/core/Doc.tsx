import { Link } from '@remix-run/react'

export function DocCard(props: Props) {
  return (
    <div className="rounded-xl border p-6 md:p-10">
      <h1 className="font-extrabold">
        Label of the Doc
        <span className="text-green-500 text-xs"> ( Signed )</span>
      </h1>
      <a
        href="https://google.com"
        target="_black"
        className="text-indigo-400 text-sm font-bold"
      >
        Open
      </a>
      <h3 className="text-sm">
        Small Description Small Description Small Description
      </h3>
      <div className="grid gap-2 pt-4">
        <Tag k="Category" v="War9a" />
        <Tag k="Gnerated By" v="Idara Foulaneya" url="https://google.com" />
        <Tag k="Delivered to" v="Mohamed Someone" url="https://google.com" />
        <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
          <Tag k="Valid Starting From" v="nhar kadha" />
          <Tag k="Valid Till" v="nhar kadha" />
        </div>
        <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
          <Tag k="Renewal" v="YES" />
          <Tag k="Can Revoke" v="YES" />
        </div>
        <Tag k="TX" v="0X00SD0ASDAS0DSAD8ASD" url="https://google.com" />
      </div>
    </div>
  )
}

export function UnsignedDocCard(props: Props) {
  return (
    <div className="rounded-xl border p-6 md:p-10">
      <h1 className="font-extrabold">
        Label of the Doc{' '}
        <span className="text-red-500 text-xs"> ( Unsigned )</span>
      </h1>
      <a
        href="https://google.com"
        target="_black"
        className="text-indigo-400 text-sm font-bold"
      >
        Open
      </a>
      <h3 className="text-sm">
        Small Description Small Description Small Description
      </h3>
      <div className="grid gap-2 pt-4">
        <Tag k="Category" v="War9a" />
        <Tag k="Gnerated By" v="Idara Foulaneya" url="https://google.com" />
        <Tag k="Delivered to" v="Mohamed Someone" url="https://google.com" />
        <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
          <Tag k="Valid Starting From" v="nhar kadha" />
          <Tag k="Valid Till" v="nhar kadha" />
        </div>
        <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
          <Tag k="Renewal" v="YES" />
          <Tag k="Can Revoke" v="YES" />
        </div>
        <Tag k="TX" v="0X00SD0ASDAS0DSAD8ASD" url="https://google.com" />
        <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
          <button className="button bg-green-400 hover:bg-green-500 focus:ring-green-300">
            Sign
          </button>
          <button className="button">Reject</button>
        </div>
      </div>
    </div>
  )
}

interface Props {}

interface TagProps {
  k: string
  v?: string
  url?: string
}

function Tag(props: TagProps) {
  if (props.url) {
    return (
      <Link to={props.url} target="_blank">
        <div className="px-2 py-1 rounded bg-indigo-600 text-white text-xs">
          {props.k}{' '}
          {props.v ? (
            <>
              : <span className="font-bold">{props.v}</span>
            </>
          ) : null}
        </div>
      </Link>
    )
  }
  return (
    <div className="px-2 py-1 rounded bg-indigo-600 text-white text-xs">
      {props.k}{' '}
      {props.v ? (
        <>
          : <span className="font-bold">{props.v}</span>
        </>
      ) : null}
    </div>
  )
}
