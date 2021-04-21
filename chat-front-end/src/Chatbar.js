import { Avatar, IconButton } from "@material-ui/core";
import React, { useState } from "react";
import "./Chatbar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { AttachFile } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import axios from "./axios"

function Chatbar({messages}) {

    const [input, setInput] = useState()

    const sendMessage = async (e) => {
        e.preventDefault()

        await axios.post("/api/v1/messages/new", {
            message : input,
            name: "NELSON",
            timestamp: "Just now",
            received : false
        })
        setInput("")
    }
  return (
    <div className="chatbar">
      <div className=" chat__header">
        <Avatar />

        <div className="chat__headerInfo">
          <h3> Room name </h3>
          <p> Last seen at...</p>
        </div>

        <div className="chat_headerRigth">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
          {messages.map(messages => (
               <p className={` chat__message ${messages.received && 'chat__receive'}`}>
               <span className="chat_name"> {messages.name}</span>
               {messages.message}
               <span className="chat__timesamp">{messages.timestamp}</span>
             </p>

          ))}
    
        <p className= "chat__message chat__receive">
          <span className="chat_name"> Sony</span>
          this is a message
          <span className="chat__timesamp">{new Date().toUTCString()}</span>
        </p>
      </div>

      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message" type="text" />
          <button onClick={sendMessage} type="submit">
            sendmessage
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chatbar;
