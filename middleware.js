module.exports = restex => {
  const auth = (req, res, next) => {
    return next();
  };
  return {auth}
};
