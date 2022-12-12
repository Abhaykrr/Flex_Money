const isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        // res.send("Please Login");
        res.render('login');
    }
    next();
}

module.exports ={isLoggedIn,};