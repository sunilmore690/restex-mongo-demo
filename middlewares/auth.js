module.exports = function(req, res, next) {
    console.log('Calling auth moddleware')
    const isAuthenticated = true;
    if(isAuthenticated){
        return next()
    }
    next({status:401,message:'Not Authorized'})
};
