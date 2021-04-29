import mongoose from 'mongoose'

const chatschema =  mongoose.Schema({
    
    channelName : String,
    chanel : {
        message: String,
        name: String,
        timestamp:  { type : Date, default: Date.now },
        received: Boolean,
        sockedId: Number
    }
    


    
});

//refer to collection
export default mongoose.model('messagecontents', chatschema)