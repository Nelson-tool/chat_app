import React, { useState } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { AttachFile } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import axios from "./../../api/axios";
import { useStateProviderValue } from "../../StateProvider";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Pusher from "pusher-js";

import "./Chatbar.css";

function Chatbar() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [lastseen, setLastSeen] = useState();
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [{ user }, dispatch] = useStateProviderValue();

  useEffect(() => {
    axios.get(`/rooms/${roomId}/messages/sync`).then((res) => {
      setMessages(res.data);
      const lmt = res.data;
      console.log("normal", lmt.length);
      const lt = lmt.length;
      if (lt > 0) {
        setLastSeen(lmt[lt - 1].timestamp);
      }
    });
  }, [roomId]);

  useEffect(() => {
    if (roomId) {
      axios.get("/rooms/sync").then((res) => {
        const data = res.data;
        console.log("data is here", data);
        //console.log(roomId);
        setRoomName(
          data.map((data) => {
            if (data._id === roomId) {
              console.log(data._id);
              return data.roomname;
            }
          })
        );
      });
    }
  }, [roomId]);

  useEffect(() => {
    const pusher = new Pusher("1ef5c9368343640510b9", {
      cluster: "eu",
    });

    var channel = pusher.subscribe("messages");

    channel.bind("updated", (newMessage) => {
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);

  const sendMessage = async (e) => {
    e.preventDefault();

    await axios.post(`/rooms/${roomId}/messages/new`, {
      message: input,
      name: user.displayName,
      recieved: true,
    });

    setInput("");
  };

  return (
    <div className="chatbar">
      <div className=" chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${roomId}.svg`} />

        <div className="chat__headerInfo">
          <h3> {roomName} </h3>
          <p>last seen today at {lastseen}</p>
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
        {messages.map((messages) => (
          <p
            className={`chat__message ${
              messages.name === user.displayName && "chat__receive"
            }`}
          >
            <span className="chat_name"> {messages.name} </span>
            {messages.message}
            <span className="chat__timesamp">{messages.timestamp}</span>
          </p>
        ))}

        <p className=" chat__receive">
          <span className="chat_name">{messages.name}</span>
          {messages.message}
        </p>
      </div>

      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            sendmessage
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chatbar;
