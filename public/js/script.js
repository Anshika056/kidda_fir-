const socket = io("http://localhost:3000")
const chatform = document.getElementById('chat-form');
const chatMessagesDiv = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');


// get username and room from url 
const {username, room} = Qs.parse(location.search,{
    ignoreQueryPrefix: true
});
console.log(username, room);

//join a user in a room
socket.emit("join-room",{username,room});
 
//listen to message sent to server
socket.on("message",(message)=>{
       
    outputmessage(message)
    chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
})

//getting username and room from server and send it into message sidebar
socket.on('roomandusers', ({room , users})=>{
    outputroomname(room);
    outputusers(users);
})



chatform.addEventListener("submit",(e)=>{
    e.preventDefault();
     
    //get the message typed in message box
    const msg = e.target.elements.msg.value;

    

    //send the message to the server
    socket.emit("chat-messages",msg) 

    e.target.elements.msg.value=""


})




//message container
const outputmessage = (message)=>{
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}


// add room name to roomsidebar
const outputroomname = (room)=>{
    roomName.innerText = room
}




// add users to usersidebar
function outputusers(users){
    userList.innerHTML = `
        ${users.map(user=>`<li>${user.username}</li>`).join('')}
    `;
}
