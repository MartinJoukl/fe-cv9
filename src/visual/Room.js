import {useState} from "react";

function Room({room, messages, username, onMessageSend}) {
    const [message, setMessage] = useState("");

    function sendMessage() {
        onMessageSend(message);
        setMessage("");
    }

    const mappedMessages = [];
    for (const message of messages) {
        if (message.senderName === username) {
            mappedMessages.push(<span className="ownMessage chatMessage"><b>{message.senderName}: {message.messageText}</b></span>)
        } else {
            mappedMessages.push(<span className="otherMessage chatMessage"><b>{message.senderName}: {message.messageText}</b></span>)
        }
    }

    return <div>
        <h1>{room.roomName}</h1>
        <h3>Selected username: {username}</h3>
        <div className="chatOuter">
            <div className={"chat"}>
                {mappedMessages}
            </div>
            <div className="inputWrapper"><span>Message:</span>
                <input
                    value={message}
                    onInput={(e) => {
                        setMessage(e.target.value);
                    }}/>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    </div>
}

export default Room