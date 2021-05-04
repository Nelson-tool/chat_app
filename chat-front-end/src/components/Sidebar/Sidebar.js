import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {SearchOutlined} from '@material-ui/icons';
import {Avatar, IconButton} from "@material-ui/core";
import SidebarChat from '../SidebarChat/SidebarChat';
import { useStateProviderValue } from "../../StateProvider";

import axios from '../../api/axios';
import Pusher from 'pusher-js';


function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const [{user}, dispatch] = useStateProviderValue();


  useEffect(() => {
    axios.get('/rooms/sync').then(res =>{
      console.log(res.data);
      setRooms(res.data);
      console.log("am here")
    });
  },[]);

  

  useEffect(() => {
    const pusher = new Pusher("1ef5c9368343640510b9", {
      cluster: "eu",
    });

    var channel = pusher.subscribe("rooms");

    channel.bind("inserted", (data) => {
      setRooms([...rooms, data]);
    });

  return ()=>{
    channel.unbind_all();
    channel.unsubscribe();
  }
}, [rooms]);

    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar src={user?.photoURL}/>
                <div className="sidebar_headerRight">
                    <IconButton>
                        <DonutLargeIcon/>
                    </IconButton>
                    <IconButton>
                        <ChatIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>
            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                <SearchOutlined/>
                <input placeholder="Search a chat" type="text"/>
                </div>
            </div>
            <div className="sidebar_chats">
                <SidebarChat addNewChat/>
                {rooms.map(roomname => (
                    <SidebarChat key={roomname._id} id={roomname._id} roomname={roomname.roomname}  />
                ))}
            </div>
        </div>
    )
}


export default Sidebar