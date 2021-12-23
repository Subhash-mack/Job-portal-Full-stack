const Jobs=require('../models/jobs');


module.exports=(app)=>{

app.get("/postjob",function(req,res){
    if (!req.isAuthenticated()) return res.sendStatus(401);
    Jobs.findOne({username:req.user.username},(err,data)=>{
      if(err) return err;
      return res.json({jobs:data.job});
    })

   
  });
  
  app.post("/postjob",function(req, res) {
    const username=req.user.username;
    const jobDetails={jobtitle:req.body.jobTitle,jobdescription:req.body.jobDescription,location:req.body.jobLocation,
    keywords:req.body.keywords};
    Jobs.findOrCreate({username:username},(err,done)=>{
      if(err) return err;
      Jobs.findOneAndUpdate({username},{ $push: {job:jobDetails}},(error,data)=>{
            if(error) return console.log(error);

            console.log(data);
          });
          res.redirect("/postjob")
    })
   
  });

}