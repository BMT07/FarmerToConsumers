import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { blog } from "../assets/data/data"

function FeaturedPost(props) {
  const { post } = props;

  return (
    // <Grid item xs={12} md={6}>
    //   <CardActionArea component="a" href="#">
    //     <Card sx={{ display: 'flex' }}>
    //       <CardContent sx={{ flex: 1 }}>
    //         <Typography component="h2" variant="h5">
    //           {post.title}
    //         </Typography>
    //         <Typography variant="subtitle1" color="text.secondary">
    //           {post.date}
    //         </Typography>
    //         <Typography variant="subtitle1" paragraph>
    //           {post.description}
    //         </Typography>
    //         <Typography variant="subtitle1" color="primary">
    //           Continue reading...
    //         </Typography>
    //       </CardContent>
    //       <CardMedia
    //         component="img"
    //         sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
    //         image={post.image}
    //         alt={post.imageLabel}
    //       />
    //     </Card>
    //   </CardActionArea>
    // </Grid>
    <section className='blog'>
       {/* // <Heading title='LATEST BLOG POSTS' desc='Latest marketplace news, success stories and tutorials.' /> */}

        <div className='posts'>
          {blog.slice(0, 3).map((items) => (
            <div className='post' key={items.id}>
              <div className='content'>
                <div className='img'>
                  <img src={items.cover} alt='' />
                </div>
                <div className='text'>
                  <button className='button'>{items.category}</button>
                  <p>
                    Post Date : <span> {items.date}</span>
                  </p>
                  <h3>{items.title.slice(0, 35)}...</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default FeaturedPost;