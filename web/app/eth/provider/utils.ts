export function getChainFromChainId(chainId: number | null) {
  switch (chainId) {
    case 3:
      return 'Ropsten Testnet (Etherium)'
    case 4:
      return 'Rinkeby Testnet (Etherium)'
    case 80001:
      return 'Mumbai Testnet (Polygon)'
    case 31337:
      return 'Localhost (Hardhat)'
    default:
      return 'UNSUPPORTED NETWORK'
  }
}

export function getSymbolFromChainId(chainId: number | null) {
  switch (chainId) {
    case 3:
      return 'ETH'
    case 4:
      return 'ETH'
    case 80001:
      return 'MATIC'
    case 31337:
      return 'ETH'

    default:
      return '$$$'
  }
}

export function supportedChain(chainId: number) {
  switch (chainId) {
    case 4:
    case 3:
    case 80001:
    case 31337:
      return true
    default:
      return false
  }
}
