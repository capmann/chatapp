import { useState } from "react";
import Button from '@mui/material/Button';
import RadioButton from '../components/RadioButton';
import { useNavigate } from 'react-router-dom';

function CreateRoom({ socket, username }: any) {
    
    const [password, setPassword] = useState("");
    const [roomType, setRoomType] = useState("");
    const [roomID, setRoomID] = useState("");
    const [roomUsers, setRoomUsers] = useState("");

    const navigate = useNavigate();

    const redirecToCreatedRoom = () => {
        navigate('/');
    };

    return (

        <div className="CreateRoom">
        <RadioButton />
        <input 
          type="text" 
          placeholder="Enter your room name..."
          onChange={(event) => {
            setRoomID(event.target.value) 
          }}
          />
        <input 
          type="text" 
          placeholder="Enter a password..."
          onChange={(event) => {
            setPassword(event.target.value) 
          }}
          />
        <input 
          type="text" 
          placeholder="Add friends..."
          onChange={(event) => {
            setRoomUsers(event.target.value) 
          }}
          />
        <Button onClick={redirecToCreatedRoom}>Create Room</Button>
        </div>
      );
}

export default CreateRoom;

