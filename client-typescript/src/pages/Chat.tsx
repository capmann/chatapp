import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import ListItems, {BasicListProps} from '../components/ListItems'
import { Message, Search } from "@mui/icons-material";
import ScrollToBottom from "react-scroll-to-bottom";

interface Message {
    room: any;
    author: any;
    message: string;
    time: string;
}

const rooms: BasicListProps['rooms'] = [{name: "Let's Transcend"}, {name: "sferard"}, {name: "threiss"}, {name: "okushnir"}, {name: "bolmos"},{name: "ljurdant"}]

function Chat({ socket, username, room}: any) {
    
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState<Message[]>([]); //List of messages coming into the chat

    const sendMessage = () => {
        if (currentMessage !== "") {
            const messageData: Message = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };

            socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]); // receive a message also when we emit it
            setCurrentMessage("");
        }
    };

    useEffect(() => { //Listen to any message received 

        socket.on("receive_message", (data: any) => {
            setMessageList((list) => [...list, data]); //when we receive a message, it is equal to whatever list it was before, with the new message added at the end
        });
        return ( () => {
            socket.off("receive_message")
        });
         //event + callback message that determines what we want to do whenever we receive this message
    }, [socket]);
    
    return (

        <>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                    {messageList.map((messageContent: Message, index: number) => {
                        return (
                            <div 
                            className="message"
                            id={username === messageContent.author ? "other" : "you"}
                            key={index}
                            > 
                            <div> 
                            <div className="message-content">
                                <p>{messageContent.message}</p>
                            </div>
                            <div className="message-meta">
                                <p id="time">{messageContent.time}</p>
                                <p id="author">{messageContent.author}</p>
                            </div>
                        </div>
                    </div>
                    );
                })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input 
                    type="text"
                    value={currentMessage}
                    placeholder='Hey...'
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                }}
                onKeyPress={(event) => {
                    event.key === "Enter" && sendMessage();
                }}
                />
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" endIcon={<SendIcon />} size="medium" onClick={sendMessage}>
                        Send
                    </Button>
                </Stack>
            </div>
        </>
    );
}

export default Chat;

