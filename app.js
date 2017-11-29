const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path=require('path');
const session = require('express-session');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const passport=require('passport');

const idea=require('./routes/idea');
require('./config/passport')(passport);

const port = process.env.PORT || 3000;

//handle bar middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//method override middleware
app.use(methodOverride('_method'))

//Flash message middleware
app.use(session({
    secret: 'Secret',
    resave: true,
    saveUninitialized: true,
  }));

  //passport middleware
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  
  //Set Global Variable
  app.use(function(req,res,next){
    res.locals.sucess_msg=req.flash('sucess_msg');
    res.locals.error_msg=req.flash('error_msg');
    res.locals.error=req.flash('error');
    next();
  });

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//Set Static Path
app.use(express.static(path.join(__dirname,'public')));

//imports Routes
app.use(require('./routes/page'));
app.use(require('./routes/idea'));
app.use(require('./routes/user'));

//Not found Page
// app.use(function(req, res) {
//     return res.status(404).send({ success: false, msg: 'Page not found' })
//   });

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});