// Initialize express:
var express = require("express");
var app = express();

// Initialize static/views folders and EJs files:
app.use(express.static(__dirname + "/static")); 
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');

// Initialize bodyParser to make use of "params" later:
var bodyParser = require('body-parser');
// use it!
app.use(bodyParser.urlencoded({extended: true}));

// Initialize session:
var session = require('express-session');
app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

// Setup the root route to run the "index.ejs" file from "views" folder:
app.get('/index', function (req, res){
  if (req.session.count >= 0) {
    req.session.count = req.session.count + 1;
    var result = req.session.count;
  }
  else {
    req.session.count = -1;
    req.session.count = req.session.count + 1;
    var result = req.session.count;
  }
  res.render('index', {result: result});
});

// // route to process new user form data:
// app.post('/users', function (req, res){
//   console.log("POST DATA \n\n", req.body)
//   //code to add user to db goes here!
//   // redirect the user back to the root route.  
//   // // set the name property of session.  
//   // req.session.name = req.body.name;
//   // console.log(req.session.name);
//   // //code to add user to db goes here!
//   // redirect the user back to the root route. 
//   res.redirect('/');
// });

// Route to print out URL-inputted ID:
app.get("/users/:id", function (req, res){
  //Console log the id from the URL:
  console.log("The user id requested is:", req.params.id);
  //Store into session the id:
  req.session.x = req.params.id;
  //Console-print the sessioned id:
  console.log(req.session.x);
  //Browser-return-print the URL and sessioned id's:
  res.send("Params: You requested the user with id: " + req.params.id + " and the session id x is: " + req.session.x + ".");
});

app.post("/countTwice", function (req, res) {
  req.session.count = req.session.count + 1;
  res.redirect('/index');
})

app.post("/reset", function (req, res) {
  console.log("************************");
  console.log(req.body);
  // req.session.count = -1;
  req.session.count = null;
  res.redirect('/index');
})

// Always end w/ this statement.
app.listen(8000, function() {
  console.log("listening on port 8000");
})