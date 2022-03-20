const users=[]

// add user in the room
const userjoin = ({id,username,room})=>{
    //   username = username.trim().toLowerCase();
    //   room = room.trim().toLowerCase();

    const exists = users.find((user)=> user.room === room && user.name === username)
    if(exists){
        return {error:"username is taken"};
    }
    const user = {id , username, room};

    users.push(user);

    return user;
}

//get user
function getuser(id){
    return users.find(user =>user.id===id);
};

//get all users in room
const getuserbyroom =(room)=>{
    return users.filter(user=> user.room === room);
}


//remove the user
const removeuser = ({id})=>{
    const deluser = users.findIndex(user=>user.id === id)

    if(deluser !== -1){
        return users.splice(deluser, 1)[0];
    }
}

module.exports = {
    userjoin,
    getuser,
    getuserbyroom,
    removeuser
}