
const mongoose=require('mongoose');

const UserAcceptedJob=mongoose.Schema({
    email:String,
    JobAppliedId:String,
    ImagePath:String,
    JobTitle:String,
    JobDesc:String,
})

module.exports=mongoose.model('UserAcceptedJob',UserAcceptedJob,'UserAcceptedJob');