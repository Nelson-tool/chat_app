import React from "react";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import { Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatIcon from "@material-ui/icons/Chat";
import { SearchOutlined } from "@material-ui/icons";
import SidebarChat from "../SidebarChat";
import "./Sidebar.css";
import { useStateProviderValue } from "../../StateProvider";


function sidebar() {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [{ user }, dispatch] = useStateProviderValue();


  return (
    <div className="sidebar">
      <div className=" sidebar_header">
      <Avatar src={user?.photoURL} />
        <div className="sidebar_headerRigth">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchOutlined />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>
      <div className="sidebar_chats">
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
      </div>
    </div>
  );
}

export default sidebar;
