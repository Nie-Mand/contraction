import { useContext, createContext } from 'react'
import { ethers, Signer } from 'ethers'

interface IWeb3Context {
  signer: Signer | null
  account: string | null
  web3: ethers.providers.Web3Provider | null
  loading: boolean
  error: string | null
  balance: number | null
  blockNumber: number | null
  network: string
  symbol: string
}

const Web3Context = createContext<IWeb3Context>({
  signer: null,
  account: null,
  web3: null,
  loading: false,
  error: null,
  balance: null,
  blockNumber: null,
  network: '',
  symbol: '',
})

export const useWeb3Context = () => useContext(Web3Context)

export default Web3Context
