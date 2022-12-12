require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const session = require('express-session');


const User = require('./models/user');


const bodyParser = require('body-parser');
const passport = require('passport');
const localStrategy = require('passport-local');


app.set('view engine','ejs');
app.set('views' ,path.join(__dirname,'/views'));
app.use(express.static(path.join(__dirname,'/public')));
app.use(express.urlencoded({extended:true}));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log("Data Base Error...");
    console.log(err);
  });

const homeRoutes = require('./routes/home');
const authRoutes = require('./routes/authroutes');





// __________________________________________________________________________________

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.session()); // make use of session login/logout)
app.use(passport.initialize()); // initialsie pass
// authenticating the user
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// _____________________________________________________________________________________


app.use(homeRoutes);
app.use(authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
  console.log(`Server connected to ${PORT} `);
});