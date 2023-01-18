const  mongoose=require('mongoose');

const DataSchema=mongoose.Schema({

    members: {
        type: Array
    },
    createdDate:{type:Date,default:Date.now()}

},{versionKey:false});

const ConversationModel=mongoose.model('conversations',DataSchema);
module.exports=ConversationModel

