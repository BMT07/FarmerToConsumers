import { React, useState } from 'react'
import { useSelector } from 'react-redux'
import { Box } from '@mui/material'
import MyChats from './MyChats'
import ChatBox from './ChatBox'
const Chat = () => {
    const [fetchAgain, setFetchAgain] = useState(false);

    const auth = useSelector(state => state.auth)
    return (
        <div>
            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", height: "91.5vh", padding: "10px" }}>
                {auth && <MyChats fetchAgain={fetchAgain} />}
                {auth && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
            </Box>
        </div>
    )
}

export default Chat
