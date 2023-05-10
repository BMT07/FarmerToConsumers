import React, { useEffect, useState } from "react";
import axios from "axios";
import { AppBar, Avatar, Box, Button, Chip, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField, Toolbar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import SendIcon from '@mui/icons-material/Send';
import FaceIcon from '@mui/icons-material/Face';

import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
const useStyles = makeStyles((theme) => ({
  button: {
    margin: "50px",
  },
  paper: {
    width: "40vw",
    height: "40vh",
    maxWidth: "500px",
    maxHeight: "1700px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#e6ffe6"
  },
  avatar: {
    marginRight: "20px",
    marginLeft: "10px"
  },
  messageContainerB: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "end",
    marginBottom: "20px",
  },
  messageContainerU: {
    display: "flex",
    alignContent: "flex-start",
    justifyContent: "start",
    marginBottom: "20px",
  },
  userMessage: {
    backgroundColor: "red",
    color: "white",
    borderRadius: "15px",
    padding: "10px",
    maxWidth: "70%",
  },
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  botMessage: {
    backgroundColor: "green",
    color: "white",
    borderRadius: "15px",
    padding: "10px",
    maxWidth: "70%",
  },
}));

function Chatbot() {
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [response, setResponse] = useState("");
  const sendMessage = async () => {
    try {
      const res = await axios.post("http://localhost:5000/predict", { message });
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: true, text: message },
        { user: false, text: res.data.answer },
      ]);
      setMessage("");
    } catch (error) {
      console.error(error);
    }
  };
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));

  const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
  }));
  return (
    <Paper sx={{
      width :"100%" , height: "60vh",
      maxWidth: "400px",
      maxHeight: 700,
      position: "relative",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      backgroundColor: "#F8F8FF",
      overflowY: "scroll",borderRadius: '10px ' 
    }}>
      <Grid container spacing={2}>
        <Grid item xs={12} >
        <AppBar color="secondary" position="static"  sx={{ height: 70}}>
          <Toolbar>
            <p style={{color:"white", fontSize:18, display:"flex", alignItems:"center", fontWeight:"Bold"}}>Farmer to consumer Chatbot</p>
              
           
          </Toolbar>
        </AppBar>
        </Grid>
        <Grid item xs={12}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={
                message.user ? classes.messageContainerU : classes.messageContainerB
              }
            >
              {
                message.user ? (
                  <>
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      variant="dot"
                      className={classes.avatar}
                    >
                      <Avatar alt="Remy Sharp" src={require("../../assets/images/user.png")} />
                    </StyledBadge>
                    <Typography
                      variant="body1"
                      className={classes.userMessage}
                    >
                      {message.text}
                    </Typography></>
                ) : (<><Typography
                  variant="body1"
                  className={classes.botMessage}
                >
                  {message.text}
                </Typography>
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                    className={classes.avatar}
                  >
                    <Avatar alt="Remy Sharp" src={require("../../assets/images/robot.png")} />
                  </StyledBadge></>
                )
              }

            </div>
          ))}
        </Grid>
        <form noValidate autoComplete="off">
          <Grid container spacing={2} marginBottom={2}>
            <Grid item xs={12} md={10} marginTop={5}>
              <FormControl sx={{ width: '35ch', marginLeft: 3, position: "fixed", zIndex: 1, bottom: 0, marginBottom: 3 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password" color="secondary">Message</InputLabel>
                <OutlinedInput
                  id="message"
                  fullWidth
                  value={message}
                  //placeholder="Type your message here"
                  color="secondary"
                  onChange={(e) => setMessage(e.target.value)}
                  type="text"
                  aria-label="Message"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="message"
                        edge="end"
                        onClick={sendMessage}
                      ><SendIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Message"
                />
              </FormControl>

            </Grid>
            <Grid item xs={4} md={2}>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Paper>
  );
}

export default Chatbot;
