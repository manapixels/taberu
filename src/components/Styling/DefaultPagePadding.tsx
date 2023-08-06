import React from 'react'
import { Box } from '@chakra-ui/react'

const DefaultPagePadding = ({ children }: { children: React.ReactNode }) => {
   return (
      <Box px={{ base: 4, md: 16 }} py={{ base: 4, md: 12 }} width="100%">
         {children}
      </Box>
   )
}

export default DefaultPagePadding
