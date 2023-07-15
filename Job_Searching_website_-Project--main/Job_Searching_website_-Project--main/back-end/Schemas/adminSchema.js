const mongoose=require('mongoose');

const adminlogin=mongoose.Schema({
    email:String,
    password:String
})

module.exports=mongoose.model('adminDetails',adminlogin,'adminDetails');