const User = require("../server/models/User");
const Post = require("../server/models/Pet");
const bcrypt = require("bcrypt");

module.exports = (app) => {
  app.get("/signup", (req, res) => {
    if (req.session.loggedIn) {
      res.redirect("/");
      return;
    }
    response.render("signup");
  });

  //  Creates a new user in the database
  app.post("/api/users", (req, res) => {
    // Looks up user-inputted email addresses in the database
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        console.log(err);
      } else {
        // If the email the user input has not already been taken or found in the database
        if (user === null) {
          // Hash password
          bcrypt.hash(req.body.password, 10, function (err, hash) {
            if (err) {
              console.log(err);
            } else {
              req.body.password = hash;
              // Add the user to the database.
              User.create(req.body, (err, post) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(post);
                  req.session.user = post._id;
                }
                res.sendStatus(200);
              });
            }
          });
          // Otherwise escape
        } else if (user) {
          res
            .status(401)
            .send(`Sorry, a user with ${req.body.email} already exists!`);
        }
      }
    });
  });

  // *Sign in request
  app.post("/api/signin", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      console.log(req.body);
      if (err) {
        console.log(err);
      } else {
        // Checks to see if there is a user with the submitted email
        if (user === null) {
          // If there is no a user with the submitted email, console user is logged and tutus 401 will be sent to the user
          console.log(user);
          res.sendStatus(401);
          return;
        } else {
          // Then compare input password to hashed password stored if email matches valid user
          console.log(user);
          bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
              console.log(err);
            }
            // When the user inputs an incorrect password, send the status code 401
            if (!result) {
              res.sendStatus(401);
              return;
            }
            // Send status code 200 to the user if the password is also correct
            if (result) {
              req.session.user = user._id;
              req.session.name = user.name;
              console.log(req.session.user);
              res.sendStatus(200);
            }
          });
        }
      }
    });
  });

  // Change user password
  app.put("/api/users/password", (req, res) => {
    if (!req.session.user) {
      res.sendStatus(401);
      return;
    } else {
      User.findOne({ _id: req.body.userId }, (err, user) => {
        // When the server cannot fulfill a request, a console error is logged and HTTP status code 500 is sent to the user.
        if (err) {
          console.log(err);
          res.sendStatus(500);
        } else {
          console.log(user);
          bcrypt.compare(req.body.password, user.password, (err, result) => {
            //   When the server cannot fulfill a request, a console error is logged and HTTP status code 500 is sent to the user.
            if (err) {
              console.log(err);
              res.sendStatus(500);

              // If the client request does not have valid authentication credentials for the requested resource, a console result is logged and tutus 401 will be sent to the user
            } else if (!result) {
              console.log(result);
              res.sendStatus(401);
            } else if (result) {
              let newPassword = "";
              bcrypt.hash(req.body.newPassword, 10, function (err, hash) {
                //   When the server still cannot fulfill a request, a console error is logged and HTTP status code 500 is sent to the user.
                if (err) {
                  console.log(err);
                  res.sendStatus(500);
                } else {
                  newPassword = hash;
                }
              });
              User.updateOne(
                { _id: req.body.userId },
                { password: newPassword },
                function (err, result) {
                  //   When the server still cannot fulfill a request, a console error is logged and HTTP status code 500 is sent to the user.
                  if (err) {
                    console.log(err);
                    res.sendStatus(500);
                    //   If the request has succeeded, console result is logged and tutus 200 will be sent to the user
                  } else {
                    console.log(result);
                    res
                      .sendStatus(200)
                      .send(
                        `Sorry, a user with ${req.body.email} already exists!`
                      );
                  }
                }
              );
            }
          });
        }
      });
    }
  });
};
