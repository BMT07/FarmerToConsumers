import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MainFeaturedPost from './MainFeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar'
const sections = [
  { title: 'Technology', url: '#' },
  { title: 'Design', url: '#' },
  { title: 'Culture', url: '#' },
  { title: 'Business', url: '#' },
  { title: 'Politics', url: '#' },
  { title: 'Opinion', url: '#' },
  { title: 'Science', url: '#' },
  { title: 'Health', url: '#' },
  { title: 'Style', url: '#' },
  { title: 'Travel', url: '#' },
];

const mainFeaturedPost = {
  title: 'The achievers', 
  description:
    "We are the achievers and we are a dynamic and strong group having great project in order to accomplish a sustainable developpement goal ...",
  image: 'https://imageio.forbes.com/specials-images/imageserve/62095d35b0ffe7643ac646ca/0x0.jpg?format=jpg&width=1200',
  imageText: 'main image description',
};

const featuredPosts = [
  {
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://fairtradecampaigns.org/wp-content/uploads/2018/09/E_2018_SDG_Poster_without_UN_emblem_Letter-US-e1537829073270.png',
    imageLabel: 'Image Text',
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://fairtradecampaigns.org/wp-content/uploads/2018/09/E_2018_SDG_Poster_without_UN_emblem_Letter-US-e1537829073270.png',
    imageLabel: 'Image Text',
  },
];


const sidebar = {
  title: 'About',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

const theme = createTheme();

export default function Aboutus() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ padding: { xs: 0, sm: 3 } }}>
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
              {/* <FeaturedPost /> */}
          </Grid>
          <Grid container spacing={5}  sx={{ mt: 3, flexDirection: { xs: 'column', md: 'row' } }}>
          <Main title="" sx={{ flex: { xs: '1 0 auto', md: '2 0 auto' } }} />
<Sidebar
  title={sidebar.title}
  description={sidebar.description}
  archives={sidebar.archives}
  social={sidebar.social}
  sx={{ flex: { xs: '1 0 auto', md: '1 0 auto' } }}
/>
          </Grid>
        </main>
      </Container>
     
    </ThemeProvider>
  );
}