import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessage.js";
import Rooms from "./dbrooms.js";

import Pusher from "pusher";
import cors from "cors";

const app = express();
const port = process.env.PORT || 5000;

//pusher config
const pusher = new Pusher({
  appId: "1191567",
  key: "1ef5c9368343640510b9",
  secret: "901846cb7ed3f0de9226",
  cluster: "eu",
  useTLS: true,
});

//mildeware
app.use(express.json());
app.use(cors());

//mongoconfig
const connection_url =
  "mongodb+srv://new-users-chat:nelson1998@cluster0.jnpqv.mongodb.net/chatappDB?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// changestream to trigger the db when you send a message
const db = mongoose.connection;

db.once("open", () => {
  console.log("Db connected");
  const msgCollection = db.collection("rooms");
  const changeStream = msgCollection.watch({ fullDocument: "updateLookup" });

  changeStream.on("change", (change) => {
    console.log(change);

    if (change.operationType === "update") {
      const messageDetails = change.fullDocument;
      //console.log("123", messageDetails);
      pusher.trigger("messages", "updated", {
        name: messageDetails.messages.name,
        message: messageDetails.messages.message,
        recieved: messageDetails.messages.recieved,
      });
    } else {
      console.log("error triggering  message Pusher");
    }
  });
});

db.once("open", () => {
  console.log("Db connected");
  const roomCollection = db.collection("rooms");
  const changeStream = roomCollection.watch();

  changeStream.on("change", (change) => {
    console.log(change);

    if (change.operationType === "insert") {
      const roomDetails = change.fullDocument;
      pusher.trigger("rooms", "inserted", {
        id: roomDetails.id,
        roomname: roomDetails.roomname,
      });
    } else {
      console.log("error triggering Pusher");
    }
  });
});

//????

//api routes
app.get("/", (req, res) => res.status(200).send("hello world"));
 var id_exp;

app.get("/rooms/:roomId/messages/sync", async (req, res) => {
 const _id = req.params.roomId;
  console.log(_id);
 const room = await Rooms.findById(_id).exec();

  const msg = room.messages;
  console.log(msg);
  res.status(200).send(msg);
});


 

app.get("/rooms/sync", (req, res) => {
  const dbRooms = req.body;

  Rooms.find(dbRooms, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log("am here 4444444", data)
      res.status(200).send(data);
    }
  });
});

app.post("/rooms/:roomId/messages/new", async (req, res) => {
  const _id = req.params.roomId;
  console.log(_id);
  const room = await Rooms.findById(_id).exec();
  console.log(room);
  room.messages.push({
    _id: new mongoose.Types.ObjectId(),
    message: req.body.message,
    name: req.body.name,
    timestamp: new Date(),
    recieved: req.body.recieved,
  });

  room.save((err) => { if (err) { 
    console.log(err) 
    console.log("Success!");
    return (err)};
  });
  res.status(201).send(res.data);
});

app.post("/rooms/new", (req, res) => {
  const dbRooms = new Rooms({
    _id: new mongoose.Types.ObjectId(),
    roomname: req.body.roomname,
    messages: [],
  });

  Rooms.create(dbRooms, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

/*
db.once("open", () => {
  console.log("DB is connected");
  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log("A change it smade", change);

    if (change.operationType === "insert") {
      const messageDetail = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetail.name,
        message: messageDetail.message,
        timestamp: messageDetail.timestamp,
        received: messageDetail.received,
       

      });
    } else {
        console.log("error pusher trigger")
    }

  });
});

//routes
app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.get("/api/v1/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});



app.post("/api/v1/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(`New message was created: \n ${data}`);
    }
  });
});
*/

//listen
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
