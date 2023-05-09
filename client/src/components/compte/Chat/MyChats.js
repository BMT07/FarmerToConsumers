import { React, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Box } from '@mui/material';
import ChatLoading from './ChatLoading';
import { Stack, Skeleton, Input } from "@mui/material";
import { getSender } from './Config/ChatLogic';
import { Typography } from "@mui/material";
import { setSelectedChat } from '../../../controller/action';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const MyChats = ({ fetchAgain }) => {
    const [loggedUser, setLoggedUser] = useState();
    const selectedChat = useSelector(state => state.chat.selectedChat);
    const dispatch = useDispatch();

    const [chats, setChats] = useState([])
    const user = useSelector(state => state.auth)


    const fetchChats = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `${localStorage.getItem('jwt')}`
                }
            };
            const { data } = await axios.get("http://localhost:8080/api/chat", config)
            console.log(data)
            setChats(data);
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        setLoggedUser(user.user)
        fetchChats()
    }, [fetchAgain])
    console.log(loggedUser)


    const handleChatClick = (chat) => {
        dispatch(setSelectedChat(chat));
    }
    return (
        <Box
            sx={{
                display: { base: selectedChat ? "none" : "flex", md: "flex" },
                flexDirection: "column",
                alignItems: "center",
                color: selectedChat ? "white" : "black",
                paddingX: 3,
                paddingY: 2,
                width: { base: "100%", md: "31%" },
                borderRadius: "lg",
                borderWidth: "1px",
                backgroundColor: "#DCDCDC"
            }}
        >
            <Box
                sx={{
                    paddingBottom: 3,
                    paddingLeft: 3,
                    paddingRight: 3,
                    fontSize: { base: "28px", md: "30px" },
                    fontFamily: "Work sans",
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#228B22",
                    color: "white",
                }}
            >
                My Chats
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: 3,
                    backgroundColor: "#F8F8F8",
                    width: "100%",
                    height: "100%",
                    borderRadius: "lg",
                    overflowY: "hidden"
                }}
            >
                {chats ? (
                    <Stack overflowY={"scroll"}>
                        {chats.map((chat) => (
                            <Box
                                onClick={() => handleChatClick(chat)}
                                cursor="pointer"
                                sx={{
                                    backgroundColor: selectedChat === chat ? "#38B2AC" : "#E8E8E8",
                                    color: selectedChat === chat ? "white" : "black",
                                    paddingX: 3,
                                    paddingY: 2,
                                    borderRadius: "lg",
                                    borderColor: selectedChat === chat ? "#38B2AC" : "#E8E8E8",
                                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                    transition: "background-color 0.2s ease-in-out",

                                }}
                                key={chat._id}
                            >
                                <Typography>
                                    <AccountCircleIcon />
                                    {getSender(loggedUser, chat.users, chat.product)}
                                </Typography>
                            </Box>
                        ))}
                    </Stack>
                ) : (
                    <ChatLoading />
                )}

            </Box>

        </Box>
    )
}

export default MyChats
