import { OrderItem } from './OrderItem'

export type Order = {
   dateCreated: string
   dateFulfilled: string
   items: [
      {
         item: OrderItem
         quantity: number
         options: any
      }
   ]
}
