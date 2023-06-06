import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true,'Please provide title of post'],
        maxLength: [ 400,'Post title should not be more than 400 characters']
    },
    text:{
        type:String,
        required: [true,'Please provide text for post'],
        maxLength: [ 2000,'post text should not be more than 2000 characters']        
    },
    //todo:add author
    author:{
        type:String,
        required: [true,'Please provide author for post'],
        maxLength: [ 120,'post author name should not be more than 120 characters']
    }
},{
    timestamps: true
})

export default mongoose.model('Post',postSchema)