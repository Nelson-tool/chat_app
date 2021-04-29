import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import Chatbar from "./components/Chatbar";
import Sidebar from "./components/Sidebar";
import axios from "./api/axios";
import "./App.css";
import { useStateProviderValue } from "./StateProvider";

import { BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "./utils/Login.js";

function App() {
  const [{ user }, dispatch] = useStateProviderValue();

  const [messages, setMessages] = useState([]);
  const [onlineUsersCount, setOnlineUsersCount] =  useState(0)
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [usersRemoved, setUsersRemoved] = useState([]);


  useEffect(() => {
    axios.get("/api/v1/messages/sync").then((response) => {
      setMessages(response.data);
    });
  }, []);

  useEffect(() => {


    const pusher = new Pusher("1ef5c9368343640510b9", {
      cluster: "eu",
    });

    var channel = pusher.subscribe("presence-channel");

     // when a new member successfully subscribes to the channel
     channel.bind("pusher:subscription_succeeded", (members) => {
      // total subscribed
      setOnlineUsersCount(members.count);
    });

    channel.bind("pusher:member_added", (member) => {
      // console.log("count",channel.members.count)
      setOnlineUsersCount(channel.members.count);
      setOnlineUsers((prevState) => [
        ...prevState,
        { name: member.info.name},
      ]);
    });

    channel.bind("pusher:member_removed", (member) => {
      setOnlineUsersCount(channel.members.count);
      setUsersRemoved((prevState) => [...prevState, member.info.name]);
    });

    channel.bind("inserted", (newMessage) => {
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);



  return (
    <div className="app">
      {!user ? (
        <Login />
      ): (
        <div className="app_body">
          <Router>
            <Sidebar />
            <Router path="/app">
                <Chatbar messages={messages} />
              </Router>
            <Switch>
              <Router path="/"></Router>
              <Chatbar messages={messages} />
            </Switch>
          </Router>
        </div>
      )}

    </div>
  );
}

export default App;
