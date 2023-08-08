import { OrderItem } from './OrderItem'

export type OrderCart = Array<{
   item: OrderItem
   quantity: number
   options?: any
}>
