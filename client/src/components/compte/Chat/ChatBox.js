import { React, useState } from 'react'
import { useSelector } from 'react-redux'
import { Box } from '@mui/material'
import SingleChat from './SingleChat'
const ChatBox = ({ fetchAgain, setFetchAgain }) => {
    const user = useSelector(state => state.auth)
    const selectedChat = useSelector(state => state.chat.selectedChat);
    console.log(selectedChat)
    return (
        <Box
            sx={{
                display: { base: selectedChat ? "flex" : "none", md: "flex" },
                alignItems: "center",
                flexDirection: "column",
                padding: 3,
                backgroundColor: "white",
                width: { base: "100%", md: "68%" },
                borderRadius: "lg",
                borderWidth: "1px",
            }}
        >
            <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </Box>
    )
}

export default ChatBox
