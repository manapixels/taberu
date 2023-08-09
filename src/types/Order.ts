export type OrderCart = {
   [key: string]: {
      item: OrderItem
      quantity: number
      options?: any
   }
}

export type OrderItem = {
   id: string
   name: string
   description: string
   price: number
   options?: [
      {
         name: string
         options: [
            {
               name: string
            }
         ]
      }
   ]
}
