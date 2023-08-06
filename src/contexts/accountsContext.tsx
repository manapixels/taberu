import { useToast } from '@chakra-ui/react'
import { createContext, useEffect, useState } from 'react'

type AccountsContextType = {
   accounts: string[]
   addAccount: (address: string) => void
   removeAccount: (address: string) => void
}

const AccountsContext = createContext<AccountsContextType | null>(null)

const AccountsContextProvider = ({
   children,
}: {
   children: React.ReactNode
}) => {
   const [accounts, setAccounts] = useState<string[]>([])
   const toast = useToast()

   useEffect(() => {
      if (localStorage.getItem('accounts')) {
         let _accounts = JSON.parse(localStorage.getItem('accounts') || '')
         setAccounts(_accounts)
      }
   }, [])

   const addAccount = (address: string) => {
      console.log(
         'Adding address to localStorage',
         address,
         accounts.indexOf(address) === -1
      )
      if (accounts.indexOf(address) === -1) {
        const _accounts = [...accounts, address]
        setAccounts(_accounts)
        localStorage.setItem('accounts', JSON.stringify(_accounts))
        toast({
           title: 'Account added.',
           status: 'success',
           duration: 3000,
           isClosable: true,
        })
      } else {
        toast({
           title: 'Account removed.',
           status: 'success',
           duration: 3000,
           isClosable: true,
        })
      }
   }

   const removeAccount = (address: string) => {
      console.log('Removing address from localStorage', address)
      const _accounts = accounts.filter((a) => a !== address)
      setAccounts(_accounts)
      localStorage.setItem('accounts', JSON.stringify(_accounts))
   }

   return (
      <AccountsContext.Provider
         value={{
            accounts: accounts,
            addAccount,
            removeAccount,
         }}
      >
         {children}
      </AccountsContext.Provider>
   )
}

export { AccountsContext, AccountsContextProvider }
