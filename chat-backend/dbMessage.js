import mongoose from 'mongoose'

const chatschema =  mongoose.Schema({
    message: String,
    name: String,
    timestamp: String,
    received: Boolean
    
});

//refer to collection
export default mongoose.model('messagecontents', chatschema)