const ConversationModel = require("../models/CoversationModel");
const UsersModel = require("../models/UsersModel");


//new conversation/CreateConversation/Create Chat//InsertSenderID ReceiverId
exports.CreateConversation = (req, res)=> {

    let senderID = req.body.senderId;
    let receiverID = req.body.receiverId;

    let PostBody = {
        members: [senderID, receiverID]
    };


    ConversationModel.create(PostBody,(error,data)=>{

        if(error){

            res.status(200).json({status:"fail", data:error});

        }else{

            res.status(200).json(data);
            //res.status(200).json(data);
        }
    })

}





//getCoversationList/GetChatList//একজন person এর সকল ChatList
exports.getConversationList = (req, res)=> {

    let userID = req.params.userId;

    ConversationModel.aggregate([

        {
            $match: {members: { $in: [userID] }}
        }
    ],(error,data)=>{

        if(error){

            res.status(200).json({status:"fail", data:error});

        }else{

            //res.status(200).json({status:"success", data:data});
            res.status(200).json(data);
        }

    })


}







//getCoversationBetweenTwoUser//getChatBetweenTwoUser//getSenderID&ReceiverID
exports.getConversationBetweenTwoUser = (req, res)=> {

    let FirstUserID = req.params.firstUserId;
    let SecondUserID = req.params.secondUserId;

    ConversationModel.aggregate([

        {
            $match: {members: { $all: [FirstUserID, SecondUserID] }}
        }
    ],(error,data)=>{

        if(error){

            res.status(200).json({status:"fail", data:error});

        }else{

            //res.status(200).json({status:"success", data:data});
            res.status(200).json(data);
        }

    })


}

