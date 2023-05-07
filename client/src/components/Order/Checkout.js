import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { Breadcrumbs } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ChakraProvider, theme } from '@chakra-ui/react';
import MapDest from './MapDest';



const steps = ['Delivery address','Estimation', 'Review your order', 'Payment details'];



const theme1 = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [price, setPrice] = React.useState(0)

  const cartProducts = useSelector((state) => state.cartReducer.carts)
  const totals = () => {
    let price = 0
    cartProducts.map((e, i) => {
      price = parseFloat(e.price) * e.quantity + price 

    })
    setPrice(price)
  }
  useEffect(() => {
    totals()
  }, [totals])

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm handleNext={handleNext} />;
        case 1:
       return ( <ChakraProvider theme={theme}>
          <MapDest handleNext={handleNext}/>
          </ChakraProvider>)
        case 2:
          return <Review handleNext={handleNext} price={price} cartProducts={cartProducts} />;        
        case 3:
          return <PaymentForm handleNext={handleNext} price={price} />;
      default:
        throw new Error('Unknown step');
    }
  }
  return (
    <>
     <Box sx={{ backgroundColor: '#F7F7F7', height: 55, p: 2, border: '1px solid #E3E3E3',paddingLeft:5 }}>
        <div role="presentation" >
          <Breadcrumbs aria-label="breadcrumb" sx={{fontSize:14}} >
            <Typography>
              Shop
            </Typography>
            <Typography color="text.primary">Chekout</Typography>
          </Breadcrumbs>
        </div>
      </Box>
    
    <ThemeProvider theme={theme1}>
      <CssBaseline />
      
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ position:'absolute' ,mt:-5 }}>
                    Back
                  </Button>
                )}

                {/* <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button> */}
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
    </>
  );
}
