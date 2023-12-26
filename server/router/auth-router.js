const express = require('express');
const router = express.Router();
const controller = require("../controllers/auth-controllers");
const signupSchema = require("../validators/auth-validator");
const loginSchema = require("../validators/login-auth");
const validate = require("../middlewares/validate-middleware")

router
    .route("/")
    .get(controller.home);

router
    .route("/register")
    .post(validate(signupSchema),controller.register);

router
    .route("/login")
    .post(validate(loginSchema),controller.login);


module.exports = router;