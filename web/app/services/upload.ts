import { Web3Storage } from 'web3.storage'

export async function upload(file: File, name: string) {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDBiRWU1ODczMjFjRGNjNDc4MEU1MTAyZDg0NmY1RjhCOEU5MzIzZDciLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjM4ODAwNTM2MjMsIm5hbWUiOiJkLWRlYWwifQ.fte0FkGV2a9demW5vuPCTbe_i2lkKYgPKztTiWuwENs'

  const storage = new Web3Storage({ token })
  const cid = await storage.put([file], {
    name: name,
    maxRetries: 3,
  })
  return cid
}

export function linkOf(avatar: string) {
  const [cid, name] = avatar.split('/')
  return `https://${cid}.ipfs.w3s.link/${name}`
}
