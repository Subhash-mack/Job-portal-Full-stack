
module.exports=(app)=>{
    
    app.get("/logout",function(req,res){
        // console.log("clicked");
        req.logout();
        res.status(200);
    })
    
}