import { useWallet, useContract, ethers, useTx, useReader } from '~/eth'
import { useState, useEffect, useMemo, useCallback } from 'react'
import BN from 'bn.js'
import abi from './abi.json'
import { useAuth } from './auth'
import { useParams } from '@remix-run/react'

export const useCreateUser = () => {
  const { contract } = useContract(
    '0x4a55e6dD9D38dD0119a436Fb409Ed717dA85FcC2',
    abi
  )

  const createUser = useTx(contract?.register)
  return createUser
}

export const useLogin = () => {
  const { connectToMetamask } = useWallet()
  const { onLoggedIn } = useAuth()
  useEffect(() => {
    connectToMetamask()
  }, [])

  const { contract } = useContract(
    '0x4a55e6dD9D38dD0119a436Fb409Ed717dA85FcC2',
    abi
  )
  const [submit, data, loading, error] = useReader(contract?.getMyData)

  useEffect(() => {
    if (data) onLoggedIn(data)
  }, [data, onLoggedIn])

  return {
    submit,
    data,
    loading,
    error,
  }
}

export const useGetMyData = () => {
  const { connectToMetamask } = useWallet()
  const { onLoggedIn } = useAuth()
  useEffect(() => {
    connectToMetamask()
  }, [])

  const { contract } = useContract(
    '0x5fbdb2315678afecb367f032d93f642f64180aa3',
    abi
  )
  const [call, data, loading, error] = useReader(contract?.getMyData)

  useEffect(() => {
    call()
  }, [call])

  useEffect(() => {
    if (data) onLoggedIn(data)
  }, [data, onLoggedIn])

  return {
    data,
    loading,
    error,
  }
}

export const useGetSomeonesData = () => {
  const { address } = useParams()
  const { connectToMetamask } = useWallet()
  const { onLoggedIn } = useAuth()
  useEffect(() => {
    connectToMetamask()
  }, [])

  const { contract } = useContract(
    '0x4a55e6dD9D38dD0119a436Fb409Ed717dA85FcC2',
    abi
  )
  const [call, data, loading, error] = useReader(contract?.getSomeonesData)

  useEffect(() => {
    if (address) call(address)
  }, [call, address])

  useEffect(() => {
    if (data) onLoggedIn(data)
  }, [data, onLoggedIn])

  return {
    data,
    loading,
    error,
  }
}

export const useLogout = () => {
  const { onLoggedOut } = useAuth()
  const { disconnect } = useWallet()
  const logout = useCallback(() => {
    disconnect()
    onLoggedOut()
  }, [disconnect, onLoggedOut])

  return logout
}
// export interface CampaignoObject {
//   delay: number
//   period: number
//   quorumPercentage: number
// }

// interface Data {
//   reason: string
//   target: number
//   maxTokensToBuy: number
//   tokenPrice: number
// }

// const usePrsetigeTokenContract = (address: string | null) => {
//   const { contract } = useContract(address || '', tokenArtifacts.abi)
//   const [maxTokensToBuy] = useReader(contract?.maximumTokenToBuy)
//   const [tokenPrice] = useReader(contract?.tokenPrice)
//   const [balanceOf] = useReader(contract?.balanceOf)

//   const getTokenData = useCallback(async () => {
//     console.log('address', address)

//     if (!address) return
//     const _maxTokensToBuy = (await maxTokensToBuy()) as BN
//     const _tokenPrice = (await tokenPrice()) as BN

//     console.log(
//       'maxTokensToBuy',
//       _maxTokensToBuy.toString(),
//       'tokenPrice',
//       _tokenPrice.toString()
//     )

//     return {
//       maxTokensToBuy: _maxTokensToBuy,
//       tokenPrice: _tokenPrice,
//     }
//   }, [contract])

//   function getBalanceOf(address: string) {
//     return balanceOf(address)
//   }

//   return { getTokenData, getBalanceOf }
// }

// export const useCampaignMetadata = (address: string) => {
//   const [loading, setLoading] = useState(false)
//   const [data, setData] = useState<Data | null>(null)
//   const [error, setError] = useState<string | null>(null)
//   const [tokenAddress, setTokenAddress] = useState<string | null>(null)
//   const { contract } = useContract(address, campaignArtifacts.abi)

//   const [reason] = useReader(contract?.reason)
//   const [target] = useReader(contract?.target)
//   const [token] = useReader(contract?.token)
//   const buyEquity = useTx(contract?.buyEquity)
//   const [holders, setHolders] = useState<{ address: string; total: number }[]>(
//     []
//   )

//   const { getTokenData, getBalanceOf } = usePrsetigeTokenContract(tokenAddress)

//   async function load() {
//     setLoading(true)
//     if (!contract) return

//     if (!ethers.utils.isAddress(address)) {
//       setError(`It is not a valid address`)
//       setLoading(false)
//       return
//     }

//     const _reason = (await reason()) as string
//     const _target = (await target()) as BN

//     const _token = (await token()) as string

//     setTokenAddress(_token)

//     const _tokenData = await getTokenData()

//     setData({
//       reason: _reason,
//       target: _target.toNumber(),
//       maxTokensToBuy: _tokenData?.maxTokensToBuy.toNumber(),
//       tokenPrice: Number(
//         ethers.utils.formatEther(_tokenData?.tokenPrice?.toNumber() || 0)
//       ),
//     })
//     setLoading(false)
//   }

//   function tokensPrice(holds: number) {
//     if (!data?.tokenPrice) return -1
//     return ethers.utils.parseEther((data?.tokenPrice * holds).toString())
//   }

//   useEffect(() => {
//     load()
//   }, [contract, tokenAddress, getTokenData])

//   async function getHolders() {
//     setLoading(true)
//     if (!contract) return
//     await contract
//       .queryFilter(contract.filters.UserJoined(), 27687614)
//       .then(async x => {
//         if (Array.isArray(x)) {
//           setLoading(false)

//           let arr: { address: string; total: number }[] = []
//           for (const i of x) {
//             console.log('for', i.args![0])
//             // const total = (await getBalanceOf(i.args![0])) as BN
//             // console.log('total', total)
//             arr.push({
//               address: i.args![0],
//               total: 0, // total.toNumber(),
//             })
//           }

//           setHolders(arr)
//         }
//       })
//   }

//   useEffect(() => {
//     getHolders()
//   }, [contract])

//   return {
//     error,
//     loading,
//     data,
//     buyEquity,
//     tokensPrice,
//     holders,
//   }
// }

// // export const useCampaigns = () => {
// //

// //   useEffect(() => {
// //     if (contract) {
// //       ;(async () => {
// //         setLoading(true)
// //         await contract
// //           .queryFilter(contract.filters.CampainCreated(), 27628769)
// //           .then(x => {
// //             if (Array.isArray(x)) {
// //               setLoading(false)
// //               x.reverse()
// //               setData(x)
// //             }
// //           })
// //       })()
// //     }
// //   }, [contract])

// //   return [data, loading] as const
// // }

// // export function useCampaignCreator() {
// //   const [fees, setFees] = useState<number | null>(null)
// //   const [feesLoading, setFeesLoading] = useState<boolean>(false)

// //   const { contract } = useContract(
// //     campaignCreatorArtifacts.address,
// //     campaignCreatorArtifacts.abi
// //   )

// //   const campainCreationFee = useReader(contract?.campainCreationFee)

// //   const _createCampaign = useTx(contract?.createCampaign)

// //   async function callCreateCampaign(obj: CampaignoObject) {
// //     if (!contract) {
// //       return
// //     }

// //     await _createCampaign[0](
// //       obj.reason,
// //       obj.delay,
// //       obj.period,
// //       obj.quorumPercentage,
// //       ethers.utils.parseEther(obj.tokenPrice.toString()),
// //       obj.target,
// //       obj.maxTokensToBuy,
// //       {
// //         value: ethers.utils.parseEther('0.001'),
// //       }
// //     )
// //   }

// //   async function getCampaignCreationfee() {
// //     setFeesLoading(true)
// //     const fees: BN = await campainCreationFee[0]()
// //     if (fees) {
// //       setFees(Number(ethers.utils.formatEther(fees)))
// //       setFeesLoading(false)
// //     }
// //   }

// //   useEffect(() => {
// //     getCampaignCreationfee()
// //     const listener = contract?.on('CampainCreated', event => {
// //       console.log(event)
// //     })

// //     return () => {
// //       listener?.removeAllListeners()
// //     }
// //   }, [contract])

// //   return [
// //     fees,
// //     callCreateCampaign,
// //     _createCampaign[1] || feesLoading,
// //     _createCampaign[2],
// //     _createCampaign[3],
// //   ] as const
// // }
