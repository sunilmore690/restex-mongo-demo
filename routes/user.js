module.exports = function(router) {
  router.post("/authenticate", "user#authenticate");
  router.get("/usercount", "user#getCount");
};
