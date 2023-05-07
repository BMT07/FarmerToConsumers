import { React, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, IconButton, Typography, FormControl, Input } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { setSelectedChat } from '../../../controller/action';
import { getSender } from './Config/ChatLogic';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import "./Chat.css"
import ScrollableChat from './ScrollableChat';
import animationData from "../../assets/animatio/typing.json";
import io from "socket.io-client"

import Lottie from "react-lottie"

const SOCKET_IO_SERVER_URL = 'http://localhost:4000';
var socket, selectedChatCompare;




const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [newMessage, setNewMessage] = useState();
    const [socketConnected, setSocketConnected] = useState(false)
    const [typing, setTyping] = useState(false)
    const [isTyping, setIsTyping] = useState(false)

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRation: "xMidYMid slice",
        }
    }


    const auth = useSelector(state => state.auth)
    const selectedChat = useSelector(state => state.chat.selectedChat);
    const dispatch = useDispatch();




    const fetchMessages = async () => {
        if (!selectedChat) return;
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${localStorage.getItem('jwt')}`
                }
            };
            setLoading(true)
            const { data } = await axios.get(`http://localhost:8080/api/message/${selectedChat._id}`, config);
            setMessages(data);
            setLoading(false);
            socket.emit('join chat', selectedChat._id)

        } catch (error) {
            console.log(error.message)
        }
    }


    useEffect(() => {
        socket = io(SOCKET_IO_SERVER_URL);
        socket.emit("setup", auth.user);
        socket.on("connected", () => setSocketConnected(true));
        socket.on('typing', () => setIsTyping(true))
        socket.on('stop typing', () => setIsTyping(false))
    }, []);


    useEffect(() => {
        fetchMessages();
        selectedChatCompare = selectedChat;
    }, [selectedChat])


    useEffect(() => {
        socket.on("message received", (newMessageReceived) => {
            if (!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
                //notification
            }
            else {
                setMessages([...messages, newMessageReceived])
            }

        })
    })

    const sendMessage = async (event) => {
        if (event.key === "Enter" && newMessage) {
            socket.emit("stop typing", selectedChat._id)
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${localStorage.getItem('jwt')}`
                    }
                }
                setNewMessage('');
                const { data } = await axios.post("http://localhost:8080/api/message", {
                    content: newMessage,
                    chatId: selectedChat._id
                }, config
                );
                socket.emit("new message", data)

                setMessages([...messages, data]);

            } catch (error) {
                console.log(error.message)
            }
        }
    }



    const typingHandler = (e) => {
        setNewMessage(e.target.value)
        //Typing indicateur logic

        if (!socketConnected) return;
        if (!typing) {
            setTyping(true)
            socket.emit('typing', selectedChat._id);
        }
        let lastTypingTime = new Date().getTime()
        var timerLenght = 3000;
        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;
            if (timeDiff >= timerLenght && typing) {
                socket.emit("stop typing", selectedChat._id);
                setTyping(false)
            }

        }, timerLenght)
    }




    const handleChatClick = (chat) => {
        dispatch(setSelectedChat(chat));
    }

    return (
        <>
            {selectedChat ? (
                <>
                    <Typography
                        fontSize={{ xs: '28px', md: '30px' }}
                        paddingBottom={3}
                        paddingLeft={2}
                        paddingRight={2}
                        width="100%"
                        fontFamily="Work Sans"
                        display="flex"
                        justifyContent={{ xs: 'space-between' }}
                        alignItems="center"
                    >
                        <IconButton
                            sx={{
                                display: { xs: 'flex', md: 'none' },
                            }}
                            onClick={() => handleChatClick("")}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                        {getSender(auth.user, selectedChat.users, selectedChat.product)}
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            padding: 3,
                            bgcolor: '#E8E8E8',
                            width: '100%',
                            height: '100%',
                            borderRadius: 'lg',
                            overflow: 'hidden',
                        }}
                    >
                        {loading ?
                            (<CircularProgress
                                size={80}
                                sx={{
                                    alignSelf: 'center',
                                    margin: 'auto',
                                }}
                            />
                            ) : (<div className='messages'>
                                <ScrollableChat messages={messages} />
                            </div>)}
                        <FormControl
                            onKeyDown={sendMessage}
                            required
                            sx={{
                                marginTop: 3,
                            }}
                        >
                            {isTyping ? <div><Lottie options={defaultOptions} width={70} style={{ marginBottom: 15, margiLeft: 0 }} /></div> : <></>}
                            <Input
                                variant="filled"
                                color="primary"
                                placeholder="Enter a message.."
                                value={newMessage}
                                onChange={typingHandler}
                                sx={{
                                    backgroundColor: '#E0E0E0',
                                }}
                            />

                        </FormControl>


                    </Box>

                </>
            ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <Typography variant="h4" sx={{ paddingBottom: 3, fontFamily: 'Work Sans' }}>
                        Click on a user to start chatting
                    </Typography>
                </Box>

            )}
        </>
    )
}

export default SingleChat
