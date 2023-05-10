import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/fr'; // pour localiser Moment en français
import 'react-datetime/css/react-datetime.css';
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Slide, Typography } from '@mui/material';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function Calendar() {
  const [livraison, setLivraison] = useState([]);
  const [contenu, setContenu]=useState({})
  const [open, setOpen] = React.useState(false);

  const getOrderFarmer = async () => {
    try {
      const res = await axios.get('http://localhost:8080/FarmerToConsumer/orderByFarmer',{
        headers: { Authorization: `${localStorage.getItem('jwt')}` }
      }).catch(err=>console.log(err));
      const data = res.data.map(item => ({
        title: "Livraison "+item.reference,
        start: moment(item.dateLivraison).toISOString(),
        allDay: true,
      }));
      setLivraison(data);
      console.log(livraison)
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDateClick =async (eventInfo) => { // bind with an arrow function
    console.log(eventInfo.event.title.slice(10))
    const data=await axios.get("http://localhost:8080/FarmerToConsumer/getorderbyref/"+eventInfo.event.title.slice(10),{
      headers: { Authorization: `${localStorage.getItem('jwt')}` }
    })
    setContenu(data.data)
    setOpen(true);
    //alert()
  }
 
  useEffect(() => {
    getOrderFarmer();
  }, []);

  return (
    <section>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={livraison}
        //dateClick={handleDateClick}
        eventClick={handleDateClick}
        locale="fr" // pour localiser FullCalendar en français
      />
       <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Order details"}</DialogTitle>
        <DialogContent>
          <Grid display={'flex'} justifyItems={'flex-center'} container spacing={2}>
            <Grid mt={5} item xs={6} md={6}>
            <Typography variant='h6' gutterBottom>Products :</Typography>
            {contenu.products?.map((e,index)=>{
              return <DialogContentText mb={2} key={index} id="alert-dialog-slide-description">{e.quantity} kg x {e.name } </DialogContentText>
            })}
            <Typography variant='h6' gutterBottom>Address :</Typography>
          <DialogContentText id="alert-dialog-slide-description">  {contenu.address}</DialogContentText>
            </Grid>
            <Grid item xs={6} md={6}>
              <img style={{width:'80%'}} src={require('../assets/images/calendar.png')} alt='calendar'/>
            </Grid>
          </Grid>
        
        
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
    </section>
  );
}


export default Calendar;
