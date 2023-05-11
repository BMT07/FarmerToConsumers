import React from 'react'
import { Box, Button, Fab, Popover } from "@mui/material"
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SmsIcon from '@mui/icons-material/Sms';
import Chatbot from './Chatbot';

function ChatBotIndex() {
    const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <>
    <Fab
          color="secondary"
          aria-describedby={id}
          onClick={handleClick}
          sx={{ position: 'fixed', bottom: 13, right: 15 }}
          >
          <SmsIcon />
        </Fab>
     
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
        }}
        transformOrigin={{
            vertical: 'center',
          horizontal: 'right',
        }}
        >
        <Chatbot />
      </Popover>
          </>
  )
}

export default ChatBotIndex