const express = require("express");
const app = express()
const path = require("path")
const http = require("http").Server(app);
const port = process.env.PORT || 3000

app.use(require('cors')())

const io = require("socket.io")(http,{                        //creating a socket instance which will be running on the server 
    cors: {
      origin: '*',
    }
});

// Setting up static floder
app.use(express.static(path.join(__dirname, 'public')));

// app.get("/", function(req, res) {
//     res.sendFile(__dirname + "/index.html");
// });


http.listen(port,function() {
    console.log("Listening on :" + port)
})