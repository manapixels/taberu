import { Token } from '@/types/Token'
import { Transaction } from '@/types/Transaction'
import { Transfer } from '@/types/Transfer'
import axios, { AxiosResponse } from 'axios'

export const getTokenList = async (address: string): Promise<Token[]> => {
   return axios
      .get(
         `https://explorer.zora.energy/api/v2/addresses/${address}/token-balances`
      )
      .then((res) => {
         return res.data.result
      })
      .catch((err) => {
         console.log(err)
      })
}

const getAllTransfers = async (address: string): Promise<Transfer[]> => {
   let page = 1
   let url = `https://explorer.zora.energy/api/v2/addresses/${address}/transactions?limit=100&page=1`
   const transfers: Transfer[] = []

   while (true) {
      try {
         const response: AxiosResponse = await axios.get(url)
         if (response.status === 200) {
            const data = response.data.items
            transfers.push(...data)

            if (response.data.next_page_params?.block_number) break
            page = page + 1
            url = `https://explorer.zora.energy/api/v2/addresses/${address}/transactions?limit=100&page=${page}`
         } else {
            console.error('Error occurred while retrieving transactions.')
            break
         }
      } catch (error) {
         console.error('Error occurred while making the request:', error)
         break
      }
   }
   return transfers
}

const assignTransferValues = async (transactions: Transaction[]) => {
   const ethResponse = await axios.post('https://mainnet.era.zksync.io/', {
      id: 42,
      jsonrpc: '2.0',
      method: 'zks_getTokenPrice',
      params: ['0x0000000000000000000000000000000000000000'],
   })

   const tokensPrice: any = {
      USDC: 1,
      USDT: 1,
      ZKUSD: 1,
      CEBUSD: 1,
      LUSD: 1,
      ETH: parseInt(ethResponse.data.result),
   }

   transactions.forEach((transaction: Transaction) => {
      transaction.transfers.forEach((transfer: Transfer) => {
         transfer.token.price = tokensPrice[transfer.token.symbol.toUpperCase()]
      })
      transaction.transfers = transaction.transfers.filter(
         (transfer: Transfer) => transfer.token.price !== undefined
      )
   })
}

export const getTransactionsList = async (
   address: string
): Promise<Transaction[]> => {
   let url = `https://block-explorer-api.mainnet.zksync.io/transactions?address=${address}&limit=100&page=1`
   const transactions: Transaction[] = []

   const ethResponse = await axios.post('https://mainnet.era.zksync.io/', {
      id: 42,
      jsonrpc: '2.0',
      method: 'zks_getTokenPrice',
      params: ['0x0000000000000000000000000000000000000000'],
   })

   // eslint-disable-next-line no-constant-condition
   while (true) {
      try {
         const response: AxiosResponse = await axios.get(url)
         if (response.status === 200) {
            const data = response.data.items
            data.forEach((transaction: any) => {
               const { hash, to, from, data, isL1Originated, fee, receivedAt } =
                  transaction
               transactions.push({
                  hash: hash,
                  to: to,
                  from: from,
                  data: data,
                  isL1Originated: isL1Originated,
                  fee: fee,
                  receivedAt: receivedAt,
                  transfers: [],
                  ethValue: parseInt(ethResponse.data.result),
               })
            })

            if (response.data.links.next === '') break
            url =
               'https://block-explorer-api.mainnet.zksync.io/' +
               response.data.links.next
         } else {
            console.error('Error occurred while retrieving transactions.')
            break
         }
      } catch (error) {
         console.error('Error occurred while making the request:', error)
         break
      }
   }

   const transfers: Transfer[] = await getAllTransfers(address)

   transfers.forEach((transfer: Transfer) => {
      if (transfer.token === null) return
      transactions.forEach((transaction: Transaction) => {
         if (transaction.hash === transfer.transactionHash) {
            transaction.transfers.push(transfer)
         }
      })
   })

   await assignTransferValues(transactions)

   return transactions
}
