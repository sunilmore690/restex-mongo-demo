let model_name = "users"; // make sure user schema exist in models dir
module.exports = function(restex) {
  let UserDao = restex.dao(model_name);
  let UserModel = restex.model(model_name)
  let authenticate = function(req, res, next) {
    //Using Promise then & catch
    UserDao.get({ email: req.body.email, password: req.body.password })
      .then(user => {
        res.json(user);
      })
      .catch(err => {
        return next(err);
      });
  };
  let getCount = (req,res,next) => {
    UserModel.count()
    .then((count)=>{
      res.json({count})
    })
    .catch((e)=>{
      return next(e)
    })
  }
  return {
    authenticate,
    getCount
  };
};
