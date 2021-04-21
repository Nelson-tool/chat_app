import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessage.js";
import Pusher from "pusher";
import cors from "cors"

const app = express();
const port = process.env.PORT || 3000;

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
app.use(cors())


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
        received: messageDetail.received
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

//listen
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
