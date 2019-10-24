const express = require("express");
var bodyParser = require("body-parser");
let RestEx = require("restex");
let path = require("path");
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/", function(req, res, next) {
  res.json({ message: "Welcome To resetex mongodb demo app" });
});
app.get("/mysql", (req, res, next) => {
  console.log("coming");
  var mysql = require("mysql");
  var connection = mysql.createConnection({
    host: "optdb-live.optcentral.com",
    user: "optuser",
    password: "OptPassWord2016",
    database: "opt_live"
  });

  connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return next(err);
    }

    console.log("connected as id " + connection.threadId);
  });

  connection.query("SELECT 1 + 1 AS solution", function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    console.log("The solution is: ", results[0].solution);
    res.json({ solution: results[0].solution });
    connection.end();
  });
});
let restex = new RestEx(app, {
  database: {
    provider: "mongo", //mongodb,mysql
    conn: {
      // mongooseConnection: mongoose.connection
      uri:
        "mongo mongodb://opt:ynttb511@opt-mongo-qa.optcentral.com:27017/test?authSource=admin"
    }
  }
  // controllersPath: path.resolve(__dirname + "/controllers"), //
  // modelsPath: path.resolve(__dirname + "/models"),
  // routesPath: path.resolve(__dirname + "/routes"),
  // middlewaresPath: path.resolve(__dirname + "/middleware.js")
});
//adding  some sample users
let UserModel = restex.model("users");
UserModel.create([
  {
    email: "scott@tiger.com",
    name: "Scott Tiger",
    password: "sam"
  },
  {
    email: "larry@oracle.com",
    name: "Larry Ellison",
    password: "sam"
  },
  {
    email: "larry@google.com",
    name: "Larry  Page",
    password: "sam"
  }
]);

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
  res.send(err);
});

app.listen(8081, function() {
  console.log("restex-mongod-demo listening on 8081");
});
