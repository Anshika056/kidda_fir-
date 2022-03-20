const express = require("express");
const app = express()
const path = require("path")
const http = require("http").Server(app);
const port = process.env.PORT || 3000
const {userjoin,getuser,getuserbyroom,removeuser}=require("./helper functions/user");
const formatMessage = require("./helper functions/message");


const kiddabot = "kidda_fir bot"                              //created a basic message bot

app.use(require('cors')())

const io = require("socket.io")(http,{                        //creating a socket instance which will be running on the server 
    cors: {
      origin: '*',
    }
});

// Setting up static folder
app.use(express.static(path.join(__dirname, 'public')));


io.on("connection",(socket)=>{
  console.log("user connected !");
 
   socket.on("join-room",({username,room})=>{
         const user = userjoin({id:socket.id,username,room})
         console.log(room)

      //join the user in the room    
      socket.join(user.room)


       // welcome new user
       socket.emit('message', formatMessage(kiddabot,'Welcome to Kidda Fir!'));

       //broadcast when a user connects
       socket.broadcast.to(user.room).emit('message', formatMessage(kiddabot, `${user.username} has joined the room`));


        // send users and room info
        io.to(user.room).emit('roomandusers',{
          room: user.room,
          users: getuserbyroom(user.room)
        })
  })
  //send the chat message to the client
socket.on("chat-messages",(msg)=>{
  //get the user for the given id
  const user = getuser(socket.id);
  console.log(user)
  console.log(msg)
 
  io.to(user.room).emit('message',formatMessage(user.username,msg));
})
})






http.listen(port,function() {
    console.log("Listening on :" + port)
})