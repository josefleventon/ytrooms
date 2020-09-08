require("dotenv").config();
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const PORT = process.env.PORT || 3450;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/pages/index.html");
});

app.get("/:roomid", (req, res) => {
  res.sendFile(__dirname + "/pages/room.html");
  io.on("connection", (socket) => {
    io.emit("event", { type: "connection"})
    console.log({ type: "connection" });
    console.log("A user connected.");
    socket.on("event", (msg) => {
      io.emit("event", msg);
      if (msg.time) latestTime = msg.time;
      console.log(msg);
    });
  });
});

http.listen(PORT, () => {
  console.log(`Listening on *:${PORT}`);
});
