import {useEffect, useRef, useState} from "react";
import Calls from "../Calls";
import RoomList from "./RoomList";
import RoomLoader from "../logic/RoomLoader";

function ChatRoomRouter() {
    const [selectedRoom, setSelectedRoom] = useState();
    const [roomList, setRoomList] = useState([]);
    const username = useRef("");
    const [newRoomName, setNewRoomName] = useState("");

    const timer = useRef();

    function onJoinRoom(room) {
        setSelectedRoom(room);
    }

    function createNewRoom() {
        Calls.createRoom({roomName: newRoomName}).then((room) => {
            onJoinRoom(room);
        });
    }

    //CORS: Cross-Origin Resource Sharing - Slouží pro definování, z jakých serverů (stránek) můžeme volat (nejen) API našeho serveru.
    // Díky cors je možné vytvářet cross-origin dotazy jen ze serverů, které jsou povolené (a tedy důveryhodné).

    useEffect(() => {
        clearInterval(timer.current);
        timer.current = setInterval(() => {
            Calls.listRooms({}).then((data) => {
                setRoomList(data);
            })
        }, 1000);
        return () => {
            clearInterval(timer.current);
        };

    }, [selectedRoom]);

    if (selectedRoom == null) {
        return <div>
            <h1>Room browser: Join or create room</h1>
            <span>Select username: </span><input type="text" onInput={((e) => {
            username.current = e.target.value
        })}/><br/>
            <span>Create new room: </span><input type="text" onInput={((e) => {
            setNewRoomName(e.target.value);
        })}/>
            <button disabled={!(newRoomName && newRoomName.length > 0)} onClick={createNewRoom}
                    style={{marginTop: "10px", marginLeft: "10px"}}>Create new room
            </button>
            <RoomList rooms={roomList} onJoinRoom={onJoinRoom}/>
        </div>
    } else return (
        <RoomLoader selectedRoom={selectedRoom} username={username.current}/>
    )
}

export default ChatRoomRouter;