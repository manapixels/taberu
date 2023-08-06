export function truncateEthereumAddress(address: `0x${string}` | string ) {
   const prefixLength = 6 // Number of characters to show from the beginning of the address
   const suffixLength = 4 // Number of characters to show from the end of the address
   return `${address.slice(0, prefixLength)}...${address.slice(-suffixLength)}`
}
