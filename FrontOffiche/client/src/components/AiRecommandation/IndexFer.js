import React from 'react'
import FertilizerRecommender from './FertilizerRecommender'
import { Box, Breadcrumbs, Grid, Typography } from '@mui/material'

function IndexFer() {
  return (
    <>
     <Box sx={{ backgroundColor: '#F7F7F7', height: 55, p: 2, border: '1px solid #E3E3E3', paddingLeft: 5 }}>
                <div role="presentation" >
                    <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: 14 }} >
                        <Typography>
                            Recommandation
                        </Typography>
                        <Typography color="text.primary">Fertilizer recommandation</Typography>
                    </Breadcrumbs>
                </div>
            </Box>
    <Grid container spacing={2} display={'flex'} alignItems={'center'}>
        <Grid item xs={12} md={6}>
        <FertilizerRecommender/>
        </Grid>
        <Grid item xs={12} md={6}>
        <div style={{textAlign:'end',marginRight:'70px',marginTop:'20px', fontWeight: 1000,
                                        fontSize: '25px',
                                        color: 'black',
                                        cursor: 'pointer'}}>
                                        Agri<span style={{color:'tomato'}} >AI</span>
                                    </div>
        <img style={{width:'100%'}} src={require('../assets/images/Fertilizer.png')} alt=''/>
        </Grid>
        
    </Grid>
    </>
  )
}

export default IndexFer