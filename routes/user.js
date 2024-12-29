const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");

const userController = require("../controller/users");

router.route("/signup")
.get(userController.renderSignUpForm)
.post(wrapAsync(userController.signUp));

router.route("/login")
.get((req, res) => {
    res.render("users/login.ejs");
})
.post( 
    saveRedirectUrl, 
    passport.authenticate("local", {
        failureRedirect: "/login", 
            failureFlash: true}), 
            userController.logIn);

router.get("/logout", userController.logOut);

module.exports = router; 