import './App.css';
import io from 'socket.io-client';
import { useState } from "react";
import Layout from './pages/Layout';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateRoom from "./pages/CreateRoom";
import SearchRoom from "./pages/Search";
import Chat from "./pages/Chat";

const socket = io("localhost:3001");

function App() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [roomType, setRoomType] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {

    if (username !== "" && room !== "") {

      socket.emit("join_room", room);
      setShowChat(true);
    }
  };  //Establish a connection between the user that connected and the socket io room that they want to enter

  return (
    
    <div className="App">
      {!showChat ? (
      <div className="joinChatContainer">
      <h3>Join Chat!</h3>
      <input 
        type="text" 
        placeholder="John..." 
        onChange={(event) => {
          setUsername(event.target.value) // whenever a value is entered in the input, we change the username state to be equal to the target value
        }}
      />
      <input 
        type="text" 
        placeholder="Room ID..."
        onChange={(event) => {
          setRoom(event.target.value) 
        }}
        />
      <input 
        type="text" 
        placeholder="Password..."
        onChange={(event) => {
          setPassword(event.target.value) 
        }}
        />
      <button onClick={joinRoom}>Join A Room</button>
      </div>
      )
    : (
      <>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={ <Layout socket={socket} username={username} room={room} />}>
                  <Route index element={<Chat socket={socket} username={username} room={room} />} />
                  <Route path="search" element={<SearchRoom />} />
                  <Route path="create" element={ <CreateRoom />} />
              </Route>
          </Routes>
      </BrowserRouter>
    </>
    )}
    </div>
  );
}

export default App;
