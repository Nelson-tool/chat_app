import { useEffect, useState } from 'react';
import Pusher from "pusher-js"
import Chatbar from './components/Chatbar';
import Sidebar from './components/Sidebar';
import axios from "./api/axios"
import './App.css';

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
      <Chatbar  messages={messages} />
      </div>    
    </div>
  );
}

export default App;
