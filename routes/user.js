module.exports = function(router) {
  /*
      user#authenticate

      user >> conntrollers/user.js
      authenticate >> authenticate method exported from user
  */
  router.post("/authenticate", "user#authenticate");
  router.get("/usercount", "user#getCount");
};
