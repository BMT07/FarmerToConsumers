import React, { useState } from 'react'
import { cropData } from "./Data"
import axios from "axios"
import { Alert, Backdrop, Box, Breadcrumbs, Button, Card, CardActions, CardContent, CardMedia, Container, CssBaseline, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper, Slide, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import "./styles/croprecommenderoutput.css"
import api from "./recommenderapi"
import { HashLoader } from "react-spinners"
import agri from '../assets/images/agri.png'


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles({
    root: {
        maxWidth: 550,
    },
    table: {
        minWidth: 450,
    },
});
const theme = createTheme();
function CropRecommender() {

    const [formData, setFormData] = useState({
        N: "",
        P: "",
        K: "",
        temperature: "",
        humidity: "",
        ph: "",
        rainfall: ""
    })
    const [predictionData, setPredictionData] = useState({})
    const [loadingStatus, setLoadingStatus] = useState(false)
    const [open, setOpen] = React.useState(false);
    const handleChange = (e) => {
        let newData = { ...formData }
        newData[e.target.id] = e.target.value
        setFormData(newData)
    }
    const handleBackClick = () => {
        setPredictionData({})
    }

    const classes = useStyles();

    const predictedCrop = cropData[predictionData.final_prediction]

    const handleClick = async () => {
        setLoadingStatus(true)
        const request = new FormData()
        for (let key in formData) {
            request.append(key, formData[key])
        }
        const response = await api.post(
            "http://127.0.0.1:5000/predict_crop",
            request
        )
        const responseData = response.data
        setPredictionData(responseData)
        setLoadingStatus(false)
        setOpen(true)
        setLoadingStatus(false)
    }


    return (
        <>
            <Box sx={{ backgroundColor: '#F7F7F7', height: 55, p: 2, border: '1px solid #E3E3E3', paddingLeft: 5 }}>
                <div role="presentation" >
                    <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: 14 }} >
                        <Typography>
                            Recommandation
                        </Typography>
                        <Typography color="text.primary">Crop recommandation</Typography>
                    </Breadcrumbs>
                </div>
            </Box>
            <ThemeProvider theme={theme}>
                <Grid container component="main" sx={{ maxHeight: '80%' }}>
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={6}
                        sx={{
                            backgroundImage: `url(${agri})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Box component="form" noValidate sx={{ mt: 1 }}>


                                {
                                    predictionData.error &&
                                    <Alert severity="error"> {predictionData.error} </Alert>
                                }

                                <center>
                                    <Grid container
                                        spacing={2}
                                        >
                                            <Grid item md={8} xs={6}>

                                        <Typography marginBottom={3} variant='h4'>Crop Recommender</Typography>
                                            </Grid>
                                        <Grid item md={4} xs={6}>

                                        <div style={{ fontWeight: 1000,
                                        fontSize: '25px',
                                        color: 'black',
                                        cursor: 'pointer'}}>
                                        Agri<span style={{color:'tomato'}} >AI</span>
                                    </div>
                                            </Grid>

                                </Grid>
                            </center>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth onChange={(e) => handleChange(e)} value={formData.N} id="N" name="N" variant="filled" label="Amount of Nitrogen in Soil" />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth onChange={(e) => handleChange(e)} value={formData.P} id="P" name="P" variant="filled" label="Amount of Phosphorous in Soil" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth onChange={(e) => handleChange(e)} value={formData.K} id="K" name="K" variant="filled" label="Amount of Pottasium in Soil" />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField fullWidth onChange={(e) => handleChange(e)} value={formData.temperature} id="temperature" name="temperature" variant="filled" label="Temperature (in Celcius)" />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth onChange={(e) => handleChange(e)} value={formData.humidity} id="humidity" name="humidity" variant="filled" label="Humidity (in %)" />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth onChange={(e) => handleChange(e)} value={formData.ph} id="ph" name="ph" variant="filled" label="pH value of Soil" />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField fullWidth onChange={(e) => handleChange(e)} value={formData.rainfall} id="rainfall" name="rainfall" variant="filled" label="Rainfall (in mm)" />
                                </Grid>
                            </Grid>
                            <Button fullWidth sx={{ marginTop: 5 }} onClick={() => handleClick()} color="success" variant="contained">Predict Crop</Button>

                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider >

            { predictedCrop && (
                <Dialog
                    TransitionComponent={Transition}
                    keepMounted
                    open={open}

                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogContent>
                        <div className="output_container" style={{ marginTop: '20px' }}>
                            <Card className={`${classes.root} output_container__card`}>
                                <CardMedia
                                    component="img"
                                    alt={predictedCrop.title}
                                    height="225"
                                    image={predictedCrop.imageUrl}
                                    title={predictedCrop.title}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        <b>Prediction: </b>{predictedCrop.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {predictedCrop.description}
                                    </Typography>
                                    <br />

                                    <TableContainer component={Paper}>
                                        <Table className={classes.table} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell component="th" align="center"><b>XGBoost Model Prediction</b></TableCell>
                                                    <TableCell component="th" align="center"><b>RandomForest Model Prediction</b></TableCell>
                                                    <TableCell component="th" align="center"><b>KNN Model Prediction</b></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell align="center">{predictionData.xgb_model_prediction} ({predictionData.xgb_model_probability}%)</TableCell>
                                                    <TableCell align="center">{predictionData.rf_model_prediction} ({predictionData.rf_model_probability}%)</TableCell>
                                                    <TableCell align="center">{predictionData.knn_model_prediction} ({predictionData.knn_model_probability}%)</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                </CardContent>
                                {/* </CardActionArea> */}
                                <CardActions>
                                    <Button onClick={() => handleBackClick()} size="small" color="error">
                                        Back to Prediction
                                    </Button>
                                </CardActions>
                            </Card>
                        </div>
                    </DialogContent>
                    <DialogActions>

                    </DialogActions>
                </Dialog>)
}
{
    loadingStatus && (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
        >

            <HashLoader color="#9bc452" />
        </Backdrop>
    )
}
        </>
    )
}

export default CropRecommender
