import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { styled } from '@mui/system';

const SocialIconWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  '& > *': {
    marginLeft: '8px',
  },
});

const QuickLinkWrapper = styled(Box)({
  
  display: 'flex',
  flexDirection: 'column',
  '& > *': {
    color:'white',
    margin: '8px 0',
    fontWeight: 'bold',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});



export default function Footer()  {
  return (
    <Box sx={{ bgcolor: '#263238', pt: 8 ,color:'white',marginTop:5 }}>
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
           About us
          </Typography>
          <Box>
            <QuickLinkWrapper>
              <Typography>Our history</Typography>
              <Typography>Our team</Typography>
              <Typography>Our partners</Typography>
              <Typography>Jobs</Typography>
            </QuickLinkWrapper>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            Services
          </Typography>
          <Box>
            <QuickLinkWrapper>
              <Typography>Farmer shop</Typography>
              <Typography>Payment</Typography>
              <Typography>Marketing</Typography>
              <Typography>On Time Delevry</Typography>
            </QuickLinkWrapper>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            Suivez-nous
          </Typography>
          <SocialIconWrapper>
            <FacebookIcon fontSize="large" />
            <TwitterIcon fontSize="large" />
            <LinkedInIcon fontSize="large" />
            <InstagramIcon fontSize="large" />
            <YouTubeIcon fontSize="large" />
          </SocialIconWrapper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            Contact-Us
          </Typography>
          <Box>
            <QuickLinkWrapper>
              <Typography>Email: FarmerToConsumer@gmail.com</Typography>
              <Typography>Tél: +216 93 886 166</Typography>
              <Typography>Adresse: Esprit Ghazela</Typography>
            </QuickLinkWrapper>
          </Box>
        </Grid>
        
    </Grid>
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 4,justifyContent:'center' }}>
      <img src={require('../assets/images/logo.png')} alt="Logo de MonSite" width="100" height="auto" style={{margin:10}} />
      <Typography sx={{color:'white',marginLeft:7}} variant="body2">© Farmer To Consumer {new Date().getFullYear()}. All rights reserved.</Typography>
    </Box>
  </Container>
</Box>
  )
}
