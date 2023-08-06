export function numberWithCommas(num: number) {
   const formattedNumber = new Intl.NumberFormat().format(num)
   return formattedNumber
}

export function nFormatter(num: number, decimals: number) {
   const lookup = [
      { value: 1, symbol: '' },
      { value: 1e3, symbol: 'K' },
      { value: 1e6, symbol: 'M' },
      { value: 1e9, symbol: 'G' },
      { value: 1e12, symbol: 'T' },
      { value: 1e15, symbol: 'P' },
      { value: 1e18, symbol: 'E' },
   ]
   const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
   var item = lookup
      .slice()
      .reverse()
      .find(function (item) {
         return num >= item.value
      })
   return item
      ? (num / item.value).toFixed(decimals).replace(rx, '$1') + item.symbol
      : '0'
}

export  function getRandomNumberBetween(min: number, max: number): number {
   if (min >= max) {
      throw new Error('Min value must be less than Max value.')
   }

   // Calculate the range and round it to avoid issues with floating-point precision
   const range = max - min
   const randomNumber = Math.random() * range + min

   return Number(randomNumber)
   // return Number(randomNumber.toFixed(3)) // Adjust the number of decimal places as needed
}