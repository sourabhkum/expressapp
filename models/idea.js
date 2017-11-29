const mongoose=require('mongoose');
const IdeaSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    details:{
        type:String,
        required:true
    },
    created_at:{
        type:Date,
        default:Date.now()
    }
});
const Idea=mongoose.model('Idea',IdeaSchema);
module.exports={Idea};