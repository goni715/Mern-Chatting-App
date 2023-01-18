const  mongoose=require('mongoose');

const DataSchema=mongoose.Schema({
    conversationId: {
        type: String,
    },
    senderId: {
        type: String,
    },
    text: {
        type: String,
    },
    
  },
  {
	timestamps: true,
  },
 {versionKey:false});

const MessageModel=mongoose.model('messages',DataSchema);
module.exports=MessageModel

