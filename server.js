const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let messages = [];

io.on("connection", (socket) => {

    socket.emit("loadMessages", messages);

    socket.on("sendMessage", (msg) => {
        messages.push(msg);
        io.emit("receiveMessage", msg);
    });

});

server.listen(3000, () => {
    console.log("Running on http://localhost:3000");
});
