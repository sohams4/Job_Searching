const mongoose=require('mongoose');

const AddedJobs=mongoose.Schema({
    ImagePath:String,
    JobTitle:String,
    JobDesc:String,
})

module.exports=mongoose.model('AddedJobs',AddedJobs,'AddedJobs');