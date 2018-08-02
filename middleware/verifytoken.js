const config = require("config");
const jwt = require("jsonwebtoken");
function verifyToken(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.headers["x-access-token"];
  console.log('verifytoken',token)
  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });

  // verifies secret and checks exp
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    // if everything is good, save to request for use in other routes
    req.user = decoded;
    next();
  });
}
module.exports = verifyToken;