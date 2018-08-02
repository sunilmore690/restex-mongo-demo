let model_name = "users"; // make sure user schema exist in models dir
var jwt = require('jsonwebtoken');
const config = require('config')
module.exports = function(restex) {
  let UserDao = restex.model(model_name);
  let authenticate = function(req, res, next) {
    //Using Promise then & catch
    UserDao.get({ email: req.body.email, password: req.body.password },{password:0})
      .then(user => {
        console.log('user',user)
        var token = jwt.sign({ id: user._id,email:user.email,name:user.name}, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });
    
        res.json({user,token});
      })
      .catch(err => {
        return next(err);
      });
  };
  return {
    authenticate
  };
};
