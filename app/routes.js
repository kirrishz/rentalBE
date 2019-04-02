const mongoose = require('mongoose');
var host       = require('./models/host');

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


    app.get('/contact', function(req, res) {
        res.render('contact.ejs'); // load the index.ejs file
    });

    app.get('/about', function(req, res) {
        res.render('about.ejs', {
          user : req.user
        });
        // load the index.ejs file
    });



    app.get('/success',isLoggedIn, function(req, res) {
        res.render('success.ejs', {
          user : req.user
        });
     });

    app.get('/host', isLoggedIn, function(req, res) {
        res.render('host.ejs' ,{
          user : req.user
        }); // load the index.ejs file
    });

    app.get('/single', isLoggedIn, function(req, res) {
        res.render('single.ejs' ,{
          user : req.user
        }); // load the index.ejs file
    });

        app.get('/blog', function(req, res) {
            res.render('blog.ejs', {
              user : req.user
            });
            // load the index.ejs file
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
            successRedirect : '/host', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
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
              successRedirect : '/',
              failureRedirect : '/login',
              failureFlash : true // allow flash messages
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
                        successRedirect : '/',
                        failureRedirect : '/login',
                        failureFlash : true // allow flash messages
                }));


                // =====================================
                // TWITTER ROUTES ======================
                // =====================================
                // route for twitter authentication and login
                app.get('/auth/twitter', passport.authenticate('twitter'));

                // handle the callback after twitter has authenticated the user
                app.get('/auth/twitter/callback',
                    passport.authenticate('twitter', {
                        successRedirect : '/',
                        failureRedirect : '/login',
                        failureFlash : true // allow flash messages
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


    app.post('/host', function(req, res) {


      var newhost = new host();
      newhost.firstName = req.body.firstName;
      newhost.lastName = req.body.lastName;
      newhost.email = req.body.email;
      newhost.nic = req.body.nic;
      newhost.address = req.body.address;
      newhost.phonenumber = req.body.phonenumber;
      newhost.model = req.body.model;
      newhost.no= req.body.no;
      newhost.fdate= req.body.fdate;
      newhost.udate = req.body.udate;
      newhost.ins= req.body.ins;
      newhost.tax= req.body.tax;
      newhost.carId = req.body.carId;






          //send mail to us when order comes
                    var nodemailer = require('nodemailer');

                    var transporter = nodemailer.createTransport({
                     service: 'gmail',
                     auth: {
                            user: 'fernwehrental@gmail.com',
                            pass: 'pretty1998'
                        }
                    });
                    var user = req.user
                    var name = user.local.lastname
                    const mailOptions = {
                      from: 'fernwehrental@gmail.com',// sender address
                      to: 'fernwehrental@gmail.com', // list of receivers
                      subject: ' New Fernweh Registration Details', // Subject line
                      html: '<div style="background-color:#eeeeef;padding:50px 0"><table style="width:540px" border="0" cellspacing="0" cellpadding="0" align="center"><tbody><tr><td style="padding:40px 30px 30px 30px" align="center" bgcolor="#33333e"><h1 style="color:#fff">Team Fernweh,<br>Register Successfully. </h1></td></tr><tr><td bgcolor="#ffffff" style="padding:40px 30px 40px 30px"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td width="260" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td>Hello ' + name + '! We got a Two wheeler registered  from you. please check in your dashboard</td></tr><tr><td style="padding:10px 0 0 0">Two wheeler id: '+newhost.carId+  '</td></tr><tr><td style="padding:10px 0 0 0">First name: '+user.local.firstname+ '</td></tr><tr><td style="padding:10px 0 0 0">Last name: '+ user.local.lastname+ '</td></tr><tr><td style="padding:10px 0 0 0">Email: '+newhost.email+ '</td></tr><tr><td style="padding:10px 0 0 0">Phone number: '+newhost.phonenumber+ '</td></tr><tr><td style="padding:10px 0 0 0">Address: '+newhost.address+ '</td></tr><tr><td style="padding:10px 0 0 0">Nic/passport: '+newhost.nic+ '</td></tr><tr><td style="padding:10px 0 0 0">From this date: '+newhost.fdate+ '</td></tr><tr><td style="padding:10px 0 0 0">Until this date: ' +newhost.udate+ '</td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td align="center" bgcolor="#fff"><h3>Thank you<br/>Fernweh Team</h3></td></tr><tr><td style="background-color:#ffffff;padding:30px 30px 30px 30px"><table border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td style="font-family:Arial,sans-serif;font-size:14px">® Fernweh, 2019</td></tr></tbody></table></td></tr></tbody></table></div>' // plain text body
                    };
                    transporter.sendMail(mailOptions, function (err, info) {
                       if(err)
                         console.log(err)
                       else
                         console.log(info);
                    });


    	newhost.save(function(err,newhost){
    	    if(err){
            res.redirect('/host');
    	        console.log(err);
    	    }else{
            res.redirect('/success');
    	        console.log("Document Save Done");


                                    //send mail to customer
                                    var nodemailer = require('nodemailer');

                                    var transporter = nodemailer.createTransport({
                                     service: 'gmail',
                                     auth: {
                                            user: 'fernwehrental@gmail.com',
                                            pass: 'pretty1998'
                                        }
                                    });
                                    var user = req.user


                                    const mailOptions = {

                                      from: 'fernwehrental@gmail.com', // sender address
                                      to: user.local.email, // list of receivers
                                      subject: 'Fernweh Registration Details', // Subject line
                                      html: '<div style="background-color:#eeeeef;padding:50px 0"><table style="width:540px" border="0" cellspacing="0" cellpadding="0" align="center"><tbody><tr><td style="padding:10px 30px 10px 30px" align="center" bgcolor="#33333e"><h1 style="color:#fff">Hi ' + user.local.lastname + ',</h1><h2 style="color:#fff">Your order has been palced successfully. We will contact you about the order as soon as possible. </h2></td></tr><tr><td bgcolor="#ffffff" style="padding:40px 30px 10px 30px"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td width="260" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td>This is a system generated email and please do not reply. For more information please contact to +94 77 851 3071 .</td></tr><h3 style="text-align:center;"> Two wheeler Order Deatils </h3><tr><td style="padding:10px 0 0 0">Two wheeler id: '+newhost.carId+  '</td></tr><tr><td style="padding:10px 0 0 0">First name: '+user.local.firstname+ '</td></tr><tr><td style="padding:10px 0 0 0">Last name: '+ user.local.lastname+ '</td></tr><tr><td style="padding:10px 0 0 0">Email: '+newhost.email+ '</td></tr><tr><td style="padding:10px 0 0 0">Phone number: '+newhost.phonenumber+ '</td></tr><tr><td style="padding:10px 0 0 0">Address: '+newhost.address+ '</td></tr><tr><td style="padding:10px 0 0 0">Nic/passport: '+newhost.nic+ '</td></tr><tr><td style="padding:10px 0 0 0">From this date: '+newhost.fdate+ '</td></tr><tr><td style="padding:10px 0 0 0">Until this date: ' +newhost.udate+ '</td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td align="center" bgcolor="#fff"><h3>Thank you<br/>Fernweh Team</h3></td></tr><tr><td style="background-color:#33333d;padding:20px 30px 20px 30px"><table border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td style="font-family:Arial,sans-serif;font-size:14px;color:#fff">® Fernweh, 2019</td></tr></tbody></table></td></tr></tbody></table></div>' // plain text body
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
    res.redirect('/login');
}
