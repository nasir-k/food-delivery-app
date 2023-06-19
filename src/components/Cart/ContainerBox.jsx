import { Box, Container } from '@mui/material'
import React from 'react'

const ContainerBox = ({children}) => {
  return (
    <Container sx={{ position:"absolute", top:"10%",left: "50%",transform:"translateX(-50%)",width: {md: "100%",lg :"90%" }}}>
        <Box sx={{ bgcolor: '#fff', height: '100%',padding: "1rem",borderRadius: "14px"}}>
            {children}
        </Box>
    </Container>

  )
}

export default ContainerBox