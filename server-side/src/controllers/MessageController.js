const MessageModel = require("../models/MessageModel");




//AddNewMessage
exports.AddNewMessage = (req, res)=> {

    let reqBody = req.body;

    MessageModel.create(reqBody,(error,data)=>{

        if(error){

            res.status(200).json({status:"fail", data:error});

        }else{

            res.status(200).json(data);
            //res.status(200).json(data);
        }
    })

}




//GetMessage
exports.GetMessage = (req, res)=> {

    let conversationID = req.params.conversationId;

    MessageModel.aggregate([

        {
            $match:{conversationId:conversationID}
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


