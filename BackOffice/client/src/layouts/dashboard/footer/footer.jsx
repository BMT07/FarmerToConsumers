import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { styled } from '@mui/system';
import logo from './logo.png';

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
    color: 'white',
    margin: '8px 0',
    fontWeight: 'bold',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

export default function Footer() {
  return (
    <Box sx={{ bgcolor: '#263238', pt: 1, pb: 1, color: 'white', marginTop: 5 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 4, justifyContent: 'center' }}>
          <img src={logo} alt="Logo de MonSite" width="100" height="auto" style={{ margin: 5 }} />
          <Typography sx={{ color: 'white', marginLeft: 7 }} variant="body2">
            © Farmer To Consumer {new Date().getFullYear()}. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
