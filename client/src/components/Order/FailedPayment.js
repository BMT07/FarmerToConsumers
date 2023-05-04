import React from 'react';
import { Button, Card, CardContent, CardMedia, Grid, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useHistory } from 'react-router-dom';


import PaymentFailedImage from '.././assets/images/Failed.jpg'
import { Heading } from '../common/Heading';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        padding: 3,



    },
    imageContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
    },
    image: {
        maxWidth: '80%',
        height: 'auto',
    },
    textContainer: {
        flex: 1,
        paddingRight: 3
    },
});

function FailedPayment() {
    const classes = useStyles();
    const history = useHistory()


    return (
        <Paper className={classes.root} elevation={0}>
            <div className={classes.textContainer}>
                <Heading title='Payment failed !' />
                <Typography sx={{ marginLeft: 5 }} variant="body1">
                    Your payment has failed. Please try again or contact customer service for assistance.                
                    </Typography>
                    <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          mt={5}
        >
          <img style={{ width: '10%' }} src={require('.././assets/images/credit-card.png')} alt='success' />

        </Grid>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    mt={5}
                >
                    <Button color='error' variant='outlined' size="large"
                        sx={{ marginRight: 5, borderRadius: '20px', width: 180 }}
                        onClick={() => history.push('/cartEdit/checkout')}
                    >Resseyer</Button>

                </Grid>
            </div>
            <div className={classes.imageContainer}>
                <img style={{ marginRight: '60px' }} src={PaymentFailedImage} alt="Paiement échoué" className={classes.image} />
            </div>
        </Paper>
    );
}

export default FailedPayment;
