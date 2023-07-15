const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const app=express();
const multer=require('multer');
app.use(cors());
app.use(express.json());

const userColl=require('./Schemas/userSchema');
const adminColl=require('./Schemas/adminSchema');


const fileStorage=multer.diskStorage(
    {
        destination:'../front-end/public/_UserProfileImage',
        filename:(req,file,cb)=>{
            let fileName=file.originalname;
            cb(null,fileName);
        }
    }
);
const fileUpload=multer({storage:fileStorage}).single('pic');


app.post('/userRegister',fileUpload,async(req,resp)=>{
    try{
        let body=req.body;
        let email=body.email;
        let checkemail=await userColl.findOne({email});
        if(!checkemail)
        {
            let imageloc=req.file.path;
            body.photopath=imageloc.substring(imageloc.indexOf('_'));
            await userColl.insertMany(body);
            resp.send({status:300,msg:"User inserted"});
        }
        else{
            resp.send({status:300,msg:"Email already existed"});
        }
    }catch(e)
    {
        resp.send({status:300,msg:"User not inserted due to "+e});
    }
})

const AddJobcoll=require('./Schemas/JobsSchema');
app.post('/addingjob',fileUpload,async(req,resp)=>{
    try{
        let body=req.body;
            let imageloc=req.file.path;
            body.ImagePath=imageloc.substring(imageloc.indexOf('_'));
            await AddJobcoll.insertMany(body);
            resp.send({status:300,msg:"Job Added"});
        
    }catch(e)
    {
        resp.send({status:300,msg:"Job not added due to "+e});
    }
})

app.get('/getalljobs',async(req,resp)=>{
    try{
    let result=await AddJobcoll.find();
    resp.send(result);
    }catch(e){
        resp.send({status:0,msg:"Error occured: "+e});
    }
})
app.get('/admin/job/delete/:id',async(req,resp)=>{
    try{
    let result=await AddJobcoll.deleteOne({_id:req.params.id})
        if(result)
        {
            resp.send({status:1,msg:"Job deleted"})

        }
        else
        {
            resp.send({staus:0,msg:"cannot delted"})
        }
    }catch(e){
        resp.send({status:0,msg:"Cannot delete due to "+e});
    }
})




app.post('/userLogin',async(req,resp)=>{
    let body=req.body;
    try{
        const finduser=await userColl.findOne(body);
        if(finduser)
        resp.send({status:300,msg:"User found"});
        else{
            
        resp.send({status:300,msg:"No User"});
        }
    }catch(e)
    {
        resp.send({status:300,msg:"User not logged In "+e});
    }
})

app.post('/adminLogin',async(req,resp)=>{
    let body=req.body;
    try{
        const adminLogin=await adminColl.findOne(body);
        if(adminLogin)
        resp.send({status:1,msg:"Successfull Admin Login"});
        else
        resp.send({status:0,msg:"Wrong Creds"})
    }catch(e){
        resp.send({status:0,msg:"Error Occured while login: "+e})
    }
})

const AcceptedCandidate=require('./Schemas/AcceptedCandidates')
const JobAppliedColl=require('./Schemas/UserAcceptedJob');
const AcceptedCandidates = require('./Schemas/AcceptedCandidates');
app.post('/user/job/applied/:id',async(req,resp)=>{
    try{
    let body=req.body;
    body.JobAppliedId=req.params.id;
    const result=await JobAppliedColl.findOne(body)
        if(!result)
        {
            body.Accepted="inprogress";
            await AcceptedCandidate.insertMany(body)
            let r2=await JobAppliedColl.insertMany(body);
            if(r2)
            {
                resp.send({status:0,msg:"Applied"})
            }
            else{
                resp.send({status:0,msg:"Unable to Apply"})
            }
        }
        else{
            resp.send({status:0,msg:"Already Applied"})
        }
    }catch(e)
    {
        resp.send({status:0,msg:"Error Occured while login: "+e})
    }
})

app.post('/user/applied/title',async(req,resp)=>{
    let body=req.body;
    let result=await JobAppliedColl.find(body);
    if(result.length>0)
    {
        resp.send(result)
    }
    else{
        resp.send(result)
    }
})

app.get('/user/job/cancel/:id/:email/:jobtitle',async(req,resp)=>{
    try{
    await AcceptedCandidate.deleteOne({email:req.params.email,JobTitle:req.params.jobtitle})
    let result=await JobAppliedColl.deleteOne({_id:req.params.id})
        if(result)
        {
            resp.send({status:1,msg:"Job deleted"})

        }
        else
        {
            resp.send({staus:0,msg:"cannot delted"})
        }
    }catch(e){
        resp.send({status:0,msg:"Cannot delete due to "+e});
    }
})

app.get('/admin/user/applied/decision/job',async(req,resp)=>
{
    let result=await AcceptedCandidates.find()
    resp.send(result)
})

app.post('/admin/user/accept/candidate/:id/:title',async(req,resp)=>{
    let body=req.body;
    let result=await JobAppliedColl.find({JobTitle:req.params.title})
    if(result.length>0)
    {
        let accept=await AcceptedCandidates.updateOne({email:body.email,JobTitle:req.params.title},{$set:{Accepted:true}});
        resp.send(accept)
    }
    else{
        resp.send({staus:0,msg:"No such Job"})
    }
})

app.post('/admin/user/reject/candidate/:id/:title',async(req,resp)=>{
    let body=req.body;
    let result=await JobAppliedColl.find({JobTitle:req.params.title})
    if(result.length>0)
    {
        let accept=await AcceptedCandidates.updateOne({email:body.email,JobTitle:req.params.title},{$set:{Accepted:false}});
        resp.send(accept)
    }
    else{
        resp.send({staus:0,msg:"No such Job"})
    }
})


app.post('/user/job/feedback',async(req,resp)=>{
    let body=req.body;
    let result=await AcceptedCandidates.find({email:body.email})
    resp.send(result)
})


app.post('/user/profile',async(req,resp)=>{
    let body=req.body;
    let result=await userColl.find(body);
    resp.send(result);
})






const connection=mongoose.connect('mongodb://localhost:27017/JobsearchProjectDB');
if(connection)
{
    console.log("Connected to Database");
}
else{
    console.log("Database not connected");
}

const port=5000;
app.listen(port,()=>{
    console.log("connected to port "+port);
});