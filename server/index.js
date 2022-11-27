const express = require('express');
const app = express(); // app = instance of the express function
require("dotenv").config(); // enable the use of the .env file
const http = require('http'); // grab an http library that already exists inside of any node.js app
const cors = require('cors'); // cross-origin resource sharing - relax the security applied to an API
const { Server } = require("socket.io"); // import an interface / class called server which comes fron the socket.io library, thus the use of the brackets

app.use(cors());

/* ------------------TO BE USED FOR THE DB ---------------------*/
// const mongoose = require("mongoose"); // for the db management. To be changed to postgresql 
// mongoose.connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology:true
// })
// .then(()=> {
//     console.log("DB CONNECTION SUCCESSFUL");
// }).catch((err)=> {
//     console.log(err.message);
// });
/* -------------------------------------------------------------*/

const server = http.createServer(app); // just pass an express app inside the function and it should generate the server

const io = new Server(server, {
    cors: {
        origin: "*", //which server is going to be making the calls to our socket.io server i.e the react server
        methods: ["GET", "POST"],
    },
}); // instantiate the server class by creating io and passing the server we just created

io.on("connection", (socket) => {

    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {

        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`); 
           
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);

    });

    socket.on("disconnect", () => {

        console.log("User Disconnected", socket.id);

    }); // listening event called disconnect 

}); // wait for an event, and some events are already built into socket.io, like connection. We are listening for an event with this event name(connection). Whenever someone connects, we call the callback function
//and we can see the ids of sockets that connected 

server.listen(process.env.PORT, () => {

    console.log(`SERVER STARTED ON PORT ${process.env.PORT}`);

}); // runs on port 3001 because react is running on port 3000

