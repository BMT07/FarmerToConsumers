import { Alert, AlertTitle, Button, Card, CardActions, CardContent, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaidIcon from '@mui/icons-material/Paid';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LoopIcon from '@mui/icons-material/Loop';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';


function MyOrders() {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [idOrder,setIdOrder]=useState('')
    const [order, setOrder] = useState([])
    const getOrder = async () => {
        const orders = await axios.get("http://localhost:8080/FarmerToConsumer/getOrder", {
            headers: { Authorization: `${localStorage.getItem('jwt')}` }
        })
            .then((res) => setOrder(res.data))
            .catch((err) => console.log(err))
        // setOrder(orders.data.data)
        console.log(order)

    }
    const cancelOrder = async (id) => {
        console.log(id)
        await axios.delete("http://localhost:8080/FarmerToConsumer/cancelOrder/" + id, {
            headers: { Authorization: `${localStorage.getItem('jwt')}` }
        })
            .then((res) => { if (res.status === 200) { getOrder() } })
            .catch((err) => console.log(err))
    }

    useEffect(() => { getOrder() }, [])
    return (
        <div>

            {order.length !== 0 ? order.map((order, index) => (
                <Card sx={{ minWidth: { xs: 300, md: 500 }, marginBottom: 2 }} key={index} >
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={7}>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Ref :{order._id.slice(0, 10)}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Your order :
                                </Typography>


                                {order.productsNameQty.map((e, index) => (
                                    <Typography key={index} sx={{ mb: 0.5 }} color="text.secondary">
                                        - {e.name + " ×" + e.quantity} Kg
                                    </Typography>))
                                }
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Typography mb={1} display={'flex'} alignItems={'center'} variant="body1">
                                    <PaidIcon sx={{ marginRight: 1 }} /> {order.total} Dt
                                </Typography>
                                <Typography mb={1} display={'flex'} alignItems={'center'} variant="body1">
                                    <LocalShippingIcon sx={{ marginRight: 1 }} /> 5000 Dt
                                </Typography>
                                <Typography mb={1} variant="body1">
                                    <DateRangeIcon sx={{ marginRight: 1 }} /> {order.createdAt.slice(0, 10)}
                                </Typography>
                                <Typography mb={1} display={'flex'} alignItems={'center'} variant="body1">
                                    Paid:{order.statusPayment === true ? (<Chip label="success" size="small" color="success" />
                                    ) : <Chip label="Failed" size="small" color="error" />}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid item container spacing={2} display={'felx'} alignItems={'center'}>
                            <Grid item xs={12} md={4}>
                                Delivery status :
                            </Grid>
                            <Grid item xs={12} md={4}>
                                {order.etat === false ? (
                                    <Chip color="warning" size="small" icon={<LoopIcon />} label="in progress" />
                                ) :
                                    <Chip color="success" size="small" icon={<FileDownloadDoneIcon />} label="Done" />
                                }
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Button sx={{ mt: 5 }} size='small' color='error' onClick={()=>{handleClickOpen();setIdOrder(order._id)}}>Cancel order</Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Cancel order"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure you want to cancel this order ?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Disagree</Button>
                            <Button onClick={() => { handleClose(); cancelOrder(idOrder) }} autoFocus>
                                Agree
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Card>
            )) : (
                <Grid container spacing={2} display={'flex'} alignItems={'center'} >

                    
                    <Grid item xs={12} md={6}>
                        <img style={{ width: '300px' }} src={require('../assets/images/Empty-pana.png')} alt=' ' />

                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Alert severity="error">
                            <AlertTitle>Info</AlertTitle>
                            Orders Not found — <strong>check it out!</strong>
                        </Alert>                   
                         </Grid>
                </Grid>

            )}

        </div>
    )
}

export default MyOrders