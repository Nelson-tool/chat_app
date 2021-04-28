import mongoose from 'mongoose'

const chatschema =  mongoose.Schema({
    
    message: String,
    name: String,
    timestamp:  { type : Date, default: Date.now },
    received: Boolean,

    
});

//refer to collection
export default mongoose.model('messagecontents', chatschema)