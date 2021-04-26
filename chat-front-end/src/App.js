import './App.css';
import Chatbar from './Chatbar';
import Sidebar from './Sidebar';
import Pusher from "pusher-js"
import { useEffect, useState } from 'react';
import axios from "./axios"

function App() {

  const [messages, setMessages] = useState([])

  useEffect(() => {
    axios.get('/api/v1/messages/sync').then(response => {
      setMessages(response.data)
    })
  }, [])


  useEffect(() => {
    const pusher = new Pusher('1ef5c9368343640510b9', {
      cluster: 'eu'
    });

    var channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      setMessages([...messages, newMessage])
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }

  }, [messages])

  console.log("helllo", messages)

  return (
    <div className="app">  
    <div className= "app_body">
      <Sidebar />
      <Chatbar  messages={messages}/>
      </div>    
    </div>
  );
}

export default App;
