const mongoose=require('mongoose');

const userlogin=mongoose.Schema({
    name:String,
    photopath:String,
    email:String,
    password:String,
    education:String,
    workExperience:String,
    skills:String,
    gender:String,
    registrationNo:String
})

module.exports=mongoose.model('userDetails',userlogin,'userDetail');