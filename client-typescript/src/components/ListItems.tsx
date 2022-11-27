import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import DraftsIcon from '@mui/icons-material/Drafts';
import { useNavigate } from 'react-router-dom';

export type BasicListProps = {
  rooms: {name: string}[]
}

export default function BasicList(props: BasicListProps) {

  const navigate = useNavigate();

  const changeRoom = () => {
      navigate('/search');
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', flexGrow: 1, overflow: 'auto'}}>
      <nav aria-label="list of rooms">
        <List>
          {props.rooms.map((room) => <ListItem disablePadding onClick={changeRoom}>
            <ListItemButton>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary={room.name} />
            </ListItemButton>
          </ListItem>)}
        </List>
      </nav>
    </Box>
  );
}
