export type CovalentTransaction = {
   block_height: number
   block_signed_at: string
   fees_paid: string
   from_address: string
   from_address_label?: string
   gas_metadata: object
   gas_offered: number
   gas_price: number
   gas_quote: number
   gas_quote_rate: number
   gas_spent: number
   log_events: Array<{}>
   miner_address: string
   pretty_gas_quote: string
   pretty_value_quote: string
   successful: boolean
   to_address: string
   to_address_label?: string
   tx_hash: string
   tx_offset: number
   value: string
   value_quote: number
}
