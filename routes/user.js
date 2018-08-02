let verifyToken = require('../middleware/verifytoken')
module.exports = function(router) {
  router.post("/authenticate", "user#authenticate");
  router.get('/isAuthenticated',function(req,res,next){
    res.json(req.user);
  },{middleware:[verifyToken]})
};
