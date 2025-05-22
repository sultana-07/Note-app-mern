const express = require('express');
const router = express.Router();

const {body} = require('express-validator');
const userController = require('../controllers/user.controller');

router.post("/register", [
    body('username').isLength({min : 4}).withMessage('Username is required'),
    body('email').isEmail().withMessage('Email is required'),
    body('password').isLength({min : 6}).withMessage('Password is required'),
],

 userController.registerUser

)

router.post("/login", [
    body('email').isEmail().withMessage('Email is required'),
    body('password').isLength({min : 6}).withMessage('Password is required'),
],

 userController.loginUser

)

module.exports = router;