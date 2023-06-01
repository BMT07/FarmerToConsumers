import React from 'react'
import { useSelector } from 'react-redux'
import ScrollableFeed from 'react-scrollable-feed'
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from './Config/ChatLogic'
import { Tooltip, Typography } from '@mui/material'
import Avatar from '@mui/material/Avatar';
const ScrollableChat = ({ messages }) => {
    const auth = useSelector(state => state.auth)
    return (
        <ScrollableFeed>
            {messages &&
                messages.map((m, i) => (
                    <div style={{ display: "flex" }} key={m._id}>
                        {(isSameSender(messages, m, i, auth.user.id) ||
                            isLastMessage(messages, i, auth.user.id)) && (
                                <Tooltip title={m.sender.name} arrow placement="bottom-start">
                                    <Avatar src="/broken-image.jpg" />
                                </Tooltip>
                            )}
                        <span
                            style={{
                                backgroundColor: `${m.sender._id === auth.user.id ? "#BEE3F8" : "#B9F5D0"
                                    }`,
                                marginLeft: isSameSenderMargin(messages, m, i, auth.user.id),
                                marginTop: isSameUser(messages, m, i, auth.user.id) ? 3 : 10,
                                borderRadius: "20px",
                                padding: "5px 15px",
                                maxWidth: "75%",
                            }}
                        >
                            {m.content}
                        </span>
                    </div>
                ))}
        </ScrollableFeed>
    )
}

export default ScrollableChat
