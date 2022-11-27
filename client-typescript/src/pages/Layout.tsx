import Button from '@mui/material/Button';
import ListItems, {BasicListProps} from '../components/ListItems'
import Divider from '@mui/material/Divider';
import { Outlet, useNavigate } from 'react-router-dom';

const rooms: BasicListProps['rooms'] = [{name: "Let's Transcend"}, {name: "sferard"}, {name: "threiss"}, {name: "okushnir"}, {name: "bolmos"},{name: "ljurdant"}]

function Layout({ socket, username, room }: any) {

    const navigate = useNavigate();

    const searchRoom = () => {
        navigate('/search');
    };
    
    const createRoom = () => {
        navigate('/create');
    };
   
    return (

            <div className="container">

                <div className="rooms">
                    <ListItems rooms={rooms}/>
                    <Divider />
                    <div className="bottom-buttons">
                    <Button variant="contained" size="medium" onClick={createRoom}>
                        Create room
                    </Button>
                    <Button variant="contained" size="medium" onClick={searchRoom}>
                        Search
                    </Button>
                    </div>
                </div>
                
                <div className="chat-window">
                    <div className="chat-header">
                        <p>Live Chat</p>
                    </div>
                    <Outlet/>
                </div>

            </div>
            );
}

export default Layout;

