import { useState } from "react";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function SearchRoom({ socket, username }: any) {
    
    const [password, setPassword] = useState("");
    const [roomID, setRoomID] = useState("");

    const navigate = useNavigate();

    const redirecToRoom = () => {
        if (roomID !== "" && password !== "")
          navigate('/');
    };
      
    return (

        <div className="SearchRoom">
        <input 
          type="text" 
          placeholder="Enter a room name..."
          onChange={(event) => {
            setRoomID(event.target.value) 
          }}
          />
        <input 
          type="text" 
          placeholder="Enter the password..."
          onChange={(event) => {
            setPassword(event.target.value) 
          }}
          />
        <Button onClick={redirecToRoom}>Join Room</Button>
        </div>
      );
}

export default SearchRoom;

