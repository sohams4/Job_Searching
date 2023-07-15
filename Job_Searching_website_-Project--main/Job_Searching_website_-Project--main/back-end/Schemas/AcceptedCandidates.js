
const mongoose=require('mongoose');

const AcceptedCandidates=mongoose.Schema({
    email:String,
    JobAppliedId:String,
    ImagePath:String,
    JobTitle:String,
    JobDesc:String,
    Accepted:String,
   
})

module.exports=mongoose.model('AcceptedCandidates',AcceptedCandidates,'AcceptedCandidates');