import { Transfer } from "./Transfer"

export interface Transaction {
   hash: string
   to: string
   from: string
   data: string
   isL1Originated: boolean
   fee: string
   receivedAt: string
   transfers: Transfer[]
   ethValue: number
}
