const express =require('express');
const UsersController = require("../controllers/UsersController");
const ConversationController = require("../controllers/ConversationController");
const MessageController = require("../controllers/MessageController");


const router = express.Router();



//This is HomePage
router.get('/', function(req,res){
    res.end('This is HomePage')
});


router.post('/registration',UsersController.registration);
router.post('/login',UsersController.login);
router.get('/GetUser/:id',UsersController.GetUser);



router.post('/CreateConversation',ConversationController.CreateConversation);
//getAllSender&Receiver//getChats//
router.get('/getConversationList/:userId',ConversationController.getConversationList);
//getConversationBetweenTwoUser
router.get('/getConversationBetweenTwoUser/:firstUserId/:secondUserId',ConversationController.getConversationBetweenTwoUser);




router.post('/AddNewMessage',MessageController.AddNewMessage);
router.get('/GetMessage/:conversationId',MessageController.GetMessage);






module.exports=router;

