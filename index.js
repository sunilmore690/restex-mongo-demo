const express = require("express");
var bodyParser = require("body-parser");
let RestEx = require("restex");
let path = require("path");
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
let restex = new RestEx(app, {
  database: {
    provider: "mongo", //mongodb,mysql
    conn: {
      // mongooseConnection: mongoose.connection
      uri: "mongodb://localhost:27017/restexdemo"
    }
  },
  controllersPath: path.resolve(__dirname + "/controllers"),
  modelsPath: path.resolve(__dirname + "/models"),
  routesPath: path.resolve(__dirname + "/routes")
});
//add some data
let UserModel = restex.models["users"];
UserModel.create(
  [
    {
      email: "scott@tiger.com",
      name: "Scott Tiger",
      password:'sam'
    },
    {
      email: "larry@oracle.com",
      name: "Larry Ellison",
      password:'sam'
    },
    {
      email: "larry@google.com",
      name: "Larry  Page",
      password:'sam'
    }
  ]
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
app.listen(3000, function() {
  console.log("restex-mongod-demo listening on 3000");
});
