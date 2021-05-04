import mongoose from 'mongoose'

const chatschema =  mongoose.Schema({
    _id : mongoose.Types.ObjectId,
    message: String,
    name: String,
    timestamp:  {type : Date,required: true, default: Date.now },
    received: Boolean,

    
});

//refer to collection
export default mongoose.model('messagecontents', chatschema)