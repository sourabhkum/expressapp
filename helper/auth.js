module.exports={
    ensureAuthenticated:function(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg','Not Authorized user')
        res.redirect('/users/login')
    }
}