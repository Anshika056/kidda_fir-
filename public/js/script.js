const socket = io("http://localhost:3000")
const chatForm = document.getElementById('chat-form');
const chatMessagesDiv = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');


// get username and room from url 
const {username, room} = Qs.parse(location.search,{
    ignoreQueryPrefix: true
});
//console.log(username, room);


