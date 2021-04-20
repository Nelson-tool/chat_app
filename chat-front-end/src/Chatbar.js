import { Avatar , IconButton} from '@material-ui/core'
import React from 'react'
import './Chatbar.css'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { AttachFile } from '@material-ui/icons';
import InsertEmoticonIcon  from '@material-ui/icons/InsertEmoticon';


function Chatbar() {
    return (
        <div className= "chatbar"> 
        <div className= " chat__header">
            <Avatar/>

            <div className= "chat__headerInfo">
                <h3> Room name </h3>
                <p> Last seen at...</p>



            </div>

            <div className= "chat_headerRigth">

            <IconButton >
                    <DonutLargeIcon />
                </IconButton>
                <IconButton >
                    < AttachFile/>
                </IconButton>
                <IconButton >
                    <MoreVertIcon />
                </IconButton>

            </div>


        </div>

        <div className= "chat__body">
            <p className= " chat__message">  
            <span className="chat_name"> Sony
            </span>
            this is a message
            <span className= "chat__timesamp">{new Date().toUTCString()}
            </span>
            </p>

            <p className= " chat__message chat__receive">  
            <span className="chat_name"> Sony
            </span>
            this is a message
            <span className= "chat__timesamp">{new Date().toUTCString()}
            </span>
            </p>

        </div>

        <div className="chat__footer">
            <InsertEmoticonIcon />
            <form>
                <input placeholder="Type a message" type="text"/> 
                <button onClick="yes" type="submit">
                sendmessage
                </button>
                </form>
        </div>
        </div>
    )
}

export default Chatbar
