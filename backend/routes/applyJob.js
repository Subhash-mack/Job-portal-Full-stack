const Jobs = require('../models/jobs');

module.exports = (app) => {

  // app.use(getJobDetails)

  app.get('/applyjob',getJobDetails, function (req, res) {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    res.json(req.jobDetails);
  });



  app.get('/jobDetails/:id', getJobDetails, (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    console.log("here");
    const jobId = req.params.id;
    console.log(jobId);
          req.jobDetails.forEach((eachJob)=>{
          if (eachJob._id.toString() === jobId) return res.status(200).json({job:eachJob,user:req.user})
          });
        });


  app.post('/applyjob/:id/company/:company/', getJobDetails,(req, res) => {
    if(!req.isAuthenticated()) return res.sendStatus(401);
    const jobId = req.params.id;
    const recruiterName=req.params.company;
    const username=req.user.username;
    const userEmail=req.user.email;
    const userPhone=req.user.phone;
    const userLocation=req.user.location;
    const appliedBy={username:username,email:userEmail,phone:userPhone,location:userLocation};
    console.log(username,userEmail,userPhone,userLocation,recruiterName);
    const filter={"job._id":jobId}
    const update={"$push": {"job.$.appliedBy": appliedBy }};
    Jobs.findOne({"job":{ "$elemMatch":{"appliedBy.username":username,"_id":jobId}}},(error,data)=>{
      if(error) return console.log(error);
      if(data) return console.log(data);
      Jobs.findOneAndUpdate(filter,update,(err,updated)=>{
        if(err) return console.log(err);
        console.log(updated);
      });
    });
    
    res.redirect('/applyjob');
          
        });

  async function getJobs(){
     return Jobs.find({});
  }
   function getJobDetails(req,res,next) {
    let ans=getJobs()
    .then(data=>{
      let jobDetails=[];
      data.forEach((eachUser) => {
      eachUser.job.forEach((eachJob) => {
        jobDetails.push({
        user:eachUser.username,
        jobtitle:eachJob.jobtitle,
        jobdescription:eachJob.jobdescription,
        location:eachJob.location,
        _id:eachJob._id
        });
      });
    });
      // console.log(jobDetails);
      req.jobDetails=jobDetails;
    next();
      })
    .catch(err=>{console.log(err);})
      
    // console.log(ans,"ans");
      
  }

  


  

}