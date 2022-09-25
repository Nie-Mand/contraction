import { useState, useEffect, useMemo } from 'react'
import { ethers, Signer } from 'ethers'
import * as utils from './utils'

export const useWalletConnect = () => {
  const [blockNumber, setBlockNumber] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [web3, setWeb3] = useState<ethers.providers.Web3Provider | null>(null)
  const [account, setAccount] = useState<string | null>(null)
  const [signer, setSigner] = useState<Signer | null>(null)
  const [chain, setChain] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [balance, setBalance] = useState<number | null>(null)

  console.log('loading', loading)

  function disconnect() {
    setWeb3(null)
    setAccount(null)
    setSigner(null)
    setChain(null)
    setError(null)
    setBalance(null)
    window.ethereum?.removeAllListeners()
  }

  function connectToMetamask() {
    setLoading(true)
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
      setWeb3(provider)
      setError(null)
      setLoading(false)
    } else {
      setError('Wallet is not installed or not enabled in this webpage')
      setLoading(false)
    }
  }

  async function loader(_account?: string) {
    const network = await web3!.getNetwork()
    const chainId = network.chainId

    setLoading(true)
    if (!utils.supportedChain(chainId)) {
      setError(`Chain with ChainID: ${chainId} is not supported`)
    } else {
      setError(null)
      setChain(chainId)
      const [account] = _account
        ? [_account]
        : await web3!.send('eth_requestAccounts', [])
      setAccount(account)
      setSigner(web3!.getSigner())
      const _balance = await web3!.getBalance(account)
      setBalance(Number(ethers.utils.formatEther(_balance)))
    }
    setLoading(false)
  }

  function handleNetworkChange() {
    window.ethereum!.on('chainChanged', async (network: string) => {
      const chainId = network.substring(2)
      if (chainId) {
        await loader()
      }
    })
  }

  function handleAccountChanged() {
    window.ethereum.on('accountsChanged', async function (accounts: string[]) {
      await loader(accounts[0])
    })
  }

  const network = useMemo(() => {
    return utils.getChainFromChainId(chain)
  }, [chain])

  const symbol = useMemo(() => {
    return utils.getSymbolFromChainId(chain)
  }, [chain])

  useEffect(() => {
    console.log('exec')

    if (web3) {
      loader()
      handleNetworkChange()
      handleAccountChanged()
    }
  }, [web3])

  return {
    signer,
    account,
    web3,
    loading,
    error,
    balance,
    blockNumber,
    network,
    symbol,
    connectToMetamask,
    disconnect,
  }
}
