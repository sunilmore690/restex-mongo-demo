module.exports = function(router) {
  router.post("/authenticate", "user#authenticate");
};
