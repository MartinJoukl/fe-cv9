import axios from "axios";

const baseUri = "http://localhost:8080";

async function listRooms(dtoIn) {
    return _callGet(`${baseUri}/listRooms`, dtoIn)
}

async function getRoom(dtoIn) {
    return _callGet(`${baseUri}/getRoom`, dtoIn)
}

async function listByRoomName(dtoIn) {
    return _callGet(`${baseUri}/listByRoomName`, dtoIn)
}

async function sendMessage(dtoIn) {
    return _callAxiosPost(`${baseUri}/sendMessage`, dtoIn)
}

async function createRoom(dtoIn) {
    return _callPost(`${baseUri}/createRoom`, dtoIn)
}

async function _callGet(uri, dtoIn) {
    if (Object.keys(dtoIn).length > 0) {
        uri += "?";
        for (const key in dtoIn) {
            uri += `${key}=${dtoIn[key]}&&`
        }
        uri = uri.slice(0, uri.length - 2);
    }
    const response = await fetch(uri, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
        //  credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
        }, redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    if (response.status !== 200 && response.status !== 201) {
        throw new Error("Server responded with status " + response.status);
    }
    return await response.json();
}

async function _callPost(uri, dtoIn) {
    const request = {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
        //  credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
        }, redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({...dtoIn}), // body data type must match "Content-Type" header
    }

    const response = await fetch(uri, request);
    if (response.status !== 200 && response.status !== 201) {
        throw new Error("Server responded with status " + response.status);
    }
    return await response.json();
}

async function _callAxiosPost(uri, dtoIn) {
    return axios.post(uri, dtoIn);
}

export default {
    listRooms,
    createRoom,
    getRoom,
    listByRoomName,
    sendMessage
}