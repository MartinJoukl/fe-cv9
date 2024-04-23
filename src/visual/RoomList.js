function RoomList({rooms, onJoinRoom}) {
    const roomElements = [];

    for (const room of rooms) {
        roomElements.push(
            <li key={room.id}>
                <button onClick={() => onJoinRoom(room)}>Join room: "{room.roomName}"</button>
            </li>)
    }
    return <div>
        <h1>List of rooms:</h1>
        <ul>
            {roomElements}
        </ul>
    </div>
}

export default RoomList