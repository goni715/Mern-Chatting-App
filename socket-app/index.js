const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = socketIo(server,{
    cors: {
        origin: 'http://localhost:3000'
    }
})







var activeUsers = [];

//in case server and client run on different urls
io.on('connection',(socket)=>{




    socket.on('new-user-add', (newUserId)=>{

         //if user is not added previosly
         if(!activeUsers.some((user)=> user.userId === newUserId)){

             activeUsers.push({
                  userId: newUserId,
                  socketId: socket.id
             })

             console.log("New User Connected", activeUsers);
         }

        // send all active users to new user
        io.emit('get-users',activeUsers);


          
    })






    //Send message
    socket.on("send-receiver-id-to-socket", (receiverId)=>{


        let user = activeUsers.find((user) =>user.userId === receiverId);


        if(user) { //যদি Receiver Id Active থাকে অথবা User ফাকা না থাকে। তাহলে

            //io.to(user.socketId).emit("receive-message", data);
            io.emit("receive-message", receiverId);

        }

    })





    socket.on("disconnect", () => {

        // remove user from active users
        activeUsers = activeUsers.filter((arrayValue)=> arrayValue.socketId !== socket.id);
        console.log("User Disconnected", activeUsers);

        // send all active users to new user
        io.emit('get-users',activeUsers);
        
    })










})



server.listen(8080, function(){
    console.log("Server Run @8080");
})