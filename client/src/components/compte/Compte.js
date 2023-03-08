import { Box, Paper } from '@mui/material'
import React from 'react'
import Login from './Login'

function Compte() {
  return (
    <div>
      <Box 
      mt={5}
      >
      <Paper elevation={3}>
        <Login/>
        </Paper>

      </Box>
        
    </div>
  )
}

export default Compte