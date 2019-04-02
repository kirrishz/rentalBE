const mongoose = require('mongoose');
var book       = require('./models/book');

// app/routes.js
module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs' , {
          user : req.user
        }); // load the index.ejs file
    });

    app.get('/add', function(req, res) {
        res.render('add.ejs'); // load the index.ejs file
    });

    app.get('/about', function(req, res) {
        res.render('about.ejs', {
          user : req.user
        });
        // load the index.ejs file
    });


    app.get('/1stcar', function(req, res) {
        res.render('1stcar.ejs', {
          user : req.user
        });
        // load the index.ejs file
    });

    app.get('/2ndcar', function(req, res) {
        res.render('2ndcar.ejs', {
          user : req.user
        });
        // load the index.ejs file
    });
    app.get('/success',isLoggedIn, function(req, res) {
        res.render('success.ejs', {
          user : req.user




        });


    });

    app.get('/book', isLoggedIn, function(req, res) {
        res.render('bookpage.ejs' ,{
          user : req.user
        }); // load the index.ejs file
    });


    app.get('/addwithuser', isLoggedIn, function(req, res) {
        res.render('addwithuser.ejs', {
            user : req.user // get the user out of session and pass to template
        });

    });
    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });
    app.get('/booklogin', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('booklogin.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);
    // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        app.post('/car/login', passport.authenticate('local-login', {
            successRedirect : '/book', // redirect to the secure profile section
            failureRedirect : '/booklogin', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));
    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
      // FACEBOOK ROUTES =====================
      // =====================================
      // route for facebook authentication and login
      app.get('/auth/facebook', passport.authenticate('facebook', {
        scope : ['public_profile', 'email']
      }));

      // handle the callback after facebook has authenticated the user
      app.get('/auth/facebook/callback',
          passport.authenticate('facebook', {
              successRedirect : '/profile',
              failureRedirect : '/'
          }));

          // =====================================
        // GOOGLE ROUTES =======================
        // =====================================
        // send to google to do the authentication
        // profile gets us their basic information including their name
        // email gets their emails
        app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

        // the callback after google has authenticated the user
        app.get('/auth/google/callback',
                passport.authenticate('google', {
                        successRedirect : '/profile',
                        failureRedirect : '/'
                }));


                // =====================================
                // TWITTER ROUTES ======================
                // =====================================
                // route for twitter authentication and login
                app.get('/auth/twitter', passport.authenticate('twitter'));

                // handle the callback after twitter has authenticated the user
                app.get('/auth/twitter/callback',
                    passport.authenticate('twitter', {
                        successRedirect : '/profile',
                        failureRedirect : '/'
                    }));





        // =====================================
        // LOGOUT ==============================
        // =====================================
        app.get('/logout', function(req, res) {
            req.logout();
            res.redirect('/');
        });



    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


    app.post('/book', function(req, res) {


          var newBook = new book();
          newBook.firstName = req.body.firstName;
          newBook.lastName = req.body.lastName;
          newBook.email = req.body.email;
          newBook.nicNumber = req.body.nicNumber;
          newBook.address = req.body.address;
          newBook.phoneNumber = req.body.phoneNumber;
          newBook.pickupDate = req.body.pickupDate;
          newBook.pickTime = req.body.pickTime;
          newBook.pickLocation = req.body.pickLocation;
          newBook.driver = req.body.driver;
          newBook.dropDate = req.body.dropDate;
          newBook.dropLocation = req.body.dropLocation;
          newBook.carId = req.body.carId;






          //send mail to us when order comes
                    var nodemailer = require('nodemailer');

                    var transporter = nodemailer.createTransport({
                     service: 'gmail',
                     auth: {
                            user: 'gleefly.online@gmail.com',
                            pass: 'Gleefly1995'
                        }
                    });
                    var user = req.user
                    var name = user.local.lastname
                    const mailOptions = {
                      from: 'gleefly.online@gmail.com',// sender address
                      to: 'gleefly.online@gmail.com', // list of receivers
                      subject: 'Gleefly order', // Subject line
                      html: '<p>Hi Gleefly team, We got a car order from ' + name + '. please check in your dashboard<br/><br/> Car order deatils- <br/>  Car id: '+newBook.carId+  '<br/>First name: '+newBook.firstName+ '<br/>Last name: '+newBook.lastName+ '<br/>Email: '+newBook.email+
                      '<br/>Phone number: '+newBook.phoneNumber+ '<br/>address: '+newBook.address+ '<br/>Nic/passport: '+newBook.nicNumber+ '<br/>Pick up date: '+newBook.pickupDate+ '<br/>Pick up time: ' +newBook.pickTime+
                      '<br/>Pick up location: '+newBook.pickLocation+ '<br/>Driver option: '+newBook.driver+ '<br/>Drop off date: '+newBook.dropDate+ '<br/>Drop off location: '+newBook.dropLocation+ '<br/><br/> Thank you<br/>Gleefly Team</p>' // plain text body
                    };
                    transporter.sendMail(mailOptions, function (err, info) {
                       if(err)
                         console.log(err)
                       else
                         console.log(info);
                    });


    	newBook.save(function(err,newBook){
    	    if(err){
            res.redirect('/book');
    	        console.log(err);
    	    }else{
            res.redirect('/success');
    	        console.log("Document Save Done");


                                    //send mail to customer
                                    var nodemailer = require('nodemailer');

                                    var transporter = nodemailer.createTransport({
                                     service: 'gmail',
                                     auth: {
                                            user: 'gleefly.online@gmail.com',
                                            pass: 'Gleefly1995'
                                        }
                                    });
                                    var user = req.user


                                    const mailOptions = {

                                      from: 'gleeflyinfo@gmail.com', // sender address
                                      to: user.local.email, // list of receivers
                                      subject: 'Gleefly order', // Subject line
                                      html: '<p>Hi ' + user.local.lastname + ', <br/><br/> Your car order has been palced successfully. We will contact you about the order as soon as possible. <br/><br/> This is a system generated email and please do not reply. For more information please contact to 0768035551 <br/><br/> Car order deatils- <br/>  Car id: '+newBook.carId+  '<br/>First name: '+newBook.firstName+ '<br/>Last name: '+newBook.lastName+ '<br/>Email: '+newBook.email+
                                      '<br/>Phone number: '+newBook.phoneNumber+ '<br/>address: '+newBook.address+ '<br/>Nic/passport: '+newBook.nicNumber+ '<br/>Pick up date: '+newBook.pickupDate+ '<br/>Pick up time: ' +newBook.pickTime+
                                      '<br/>Pick up location: '+newBook.pickLocation+ '<br/>Driver option: '+newBook.driver+ '<br/>Drop off date: '+newBook.dropDate+ '<br/>Drop off location: '+newBook.dropLocation+ '<br/><br/> Thank you<br/>Gleefly</p>'// plain text body
                                    };
                                    transporter.sendMail(mailOptions, function (err, info) {
                                       if(err)
                                         console.log(err)
                                       else
                                         console.log(info);
                                    });  // load the index.ejs file


    	    }
    		});



          });


};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/booklogin');
}
