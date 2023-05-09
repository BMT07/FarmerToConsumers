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
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                padding: 3,
                backgroundColor: "white",
                borderRadius: "lg",
                borderWidth: "1px",
                maxWidth: "100%",
                flexGrow: 1,
                flexShrink: 0,
                flexBasis: { base: "100%", md: "68%" },
                visibility: { base: selectedChat ? "visible" : "hidden", md: "visible" },
            }}

        >
            <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </Box>
    )
}

export default ChatBox
