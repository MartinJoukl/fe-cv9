import Room from "../visual/Room";
import {useEffect, useRef, useState} from "react";
import Calls from "../Calls";

function RoomLoader({selectedRoom, username}) {

    const [messages, setMessages] = useState([]);
    const selectedUsername = username && username.length > 0 ? username : "Anonymous";
    const timer = useRef();


    useEffect(() => {
        clearInterval(timer.current);
        timer.current = setInterval(() => {
            Calls.listByRoomName({roomName: selectedRoom.roomName}).then(
                (data) => {
                    setMessages(data)
                }
            );
        }, 300)
        return () => {
            clearInterval(timer.current);
        };
    }, [selectedRoom, username])

    function onMessageSend(message) {
        Calls.sendMessage({
            sender: username,
            messageText: message,
            roomName: selectedRoom.roomName
        }).then(
            (_) => {
                Calls.listByRoomName({roomName: selectedRoom.roomName}).then(
                    (data) => {
                        setMessages(data)
                    }
                );
            }
        );
    }


    return <Room room={selectedRoom} messages={messages} username={selectedUsername} onMessageSend={onMessageSend}/>
}

export default RoomLoader