const UsersModel = require("../models/UsersModel");
const jwt = require("jsonwebtoken");

exports.registration = (req,res)=>{

    let reqBody = req.body;

    UsersModel.create(reqBody,(error,data)=>{

        if(error){

            res.status(200).json({status:"fail", data:error});

        }else{

            res.status(200).json({status:"success", data:data});
            //res.status(200).json(data);
        }
    })
}






//UserLogin
exports.login=(req,res)=>{

    let reqBody=req.body;

    UsersModel.aggregate([

        {$match:reqBody},
        {$project:{_id:1,email:1,userName:1}}

    ],(err,data)=>{
        if(err){
            res.status(400).json({status:"fail",data:err})
        }
        else {
            if(data.length>0){

                let Payload={exp: Math.floor(Date.now() / 1000) + (24*60*60), data:data[0]['email']}
                let token = jwt.sign( Payload,'SecretKey123456789');
                res.status(200).json({status:"success",token:token,data:data[0]})

            }
            else {
                res.status(200).json({status:"UserNotFound"})
            }
        }
    })
}





/*
//Get a UserData/SelectUser
exports.GetUser = (req, res)=> {

    let Email = (req.params.id);

    UsersModel.aggregate([

        {
            $match:{email:Email}
        }

    ],(error,data)=>{

        if(error){

            res.status(200).json({status:"fail", data:error});

        }else{

            //res.status(200).json({status:"success", data:data});
            res.status(200).json(data);
        }

    })


}*/






//Get a UserData/SelectUser
exports.GetUser = (req, res)=> {

    let ID = (req.params.id);

    UsersModel.find(
        {_id:ID}
        ,(error,data)=>{

            if(error){

                res.status(200).json({status:"fail", data:error});

            }else{

                //res.status(200).json({status:"success", data:data});
                res.status(200).json(data);
            }

        })


}


