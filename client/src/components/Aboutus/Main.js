import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, ImageList, ImageListItem } from '@mui/material';
function Main(props) {
  const { posts, title } = props;

  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{ 
        '& .markdown': {
          py: 3,
        },
        width: '100%',
      }}
    >
            <div className="markdown" sx={{ maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      
        <div className="markdown" >
        <section>
    <ImageList sx={{ width: '100%', height: 170 }} cols={5} rowHeight={164}>
    <ImageListItem>
      <img
        src={require("../assets/images/bakary.jpg")} 
        loading="lazy"
      />
    </ImageListItem>
    <ImageListItem>
      <img
        src={require("../assets/images/haikel.jpg")}
        loading="lazy"
      />
    </ImageListItem>
    <ImageListItem>
      <img
        src={require("../assets/images/baherr.jpg")}
        loading="lazy"
      />
    </ImageListItem>
    <ImageListItem>
      <img
        src={require("../assets/images/amani.jpg")}
        loading="lazy"
      />
    </ImageListItem>
    <ImageListItem>
      <img
        src={require("../assets/images/souhaieb.jpg")}
        loading="lazy"
      />
    </ImageListItem>
</ImageList>
    </section>
    <Card>
    <CardContent>
    <Typography variant="h2" sx={{color : '#1d9e26f3'}}>
      <div>who we are ?</div>
    </Typography>
        <Typography variant="body2">
        <div>We are the Achievers, a group of dynamic students who are committed to promoting sustainable and responsible agriculture.</div> 
        <div>Our application, Farmer to Consumer, is a marketplace platform that connects farmers directly with consumers and facilitates the delivery process at a lower cost.</div> 
       <div> By providing a direct marketplace for farmers to sell their products, we aim to reduce poverty and improve economic opportunities for small-scale farmers, while promoting sustainable agriculture and reducing the environmental impact of food production and transportation. </div>
        <div>Our application contributes to several SDGs, including No Poverty, Zero Hunger, and Responsible Consumption and Production. To further enhance the impact of our platform, we plan to incorporate features that promote transparency and traceability in the food supply chain, such as providing information on the origin and production practices of the products sold on the platform. </div>
        <div>We believe that by facilitating communication between farmers and consumers and promoting responsible consumption, we can help to create a more sustainable and equitable food system.</div>
          </Typography></CardContent>
    </Card>
        <Card sx={{ minWidth: 275 }}>       
        <CardMedia
        component="img"
        height="194"
        image={require("../assets/images/logo.png")}
        alt="Paella dish"
      />
       <CardContent>
        <Typography variant="body2">
        <div>At Farmer to Consumer, we are committed to promoting sustainable agriculture and reducing poverty by connecting farmers directly with consumers.</div>
         <div>What sets us apart is our user-friendly platform that makes it easy for farmers to market their products and for consumers to find fresh, locally grown produce. </div>
         <div>We charge minimal fees to both farmers and consumers, which means that farmers can earn a fair price for their products and consumers can access high-quality produce at an affordable price.</div>
        </Typography>
        </CardContent>

    </Card>

        
</div>
</div>
    </Grid>
  );
}

Main.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
};

export default Main;