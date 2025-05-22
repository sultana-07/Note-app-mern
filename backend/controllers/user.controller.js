const userModel = require('../models/user.models');

const {validationResult} = require('express-validator');

module.exports.registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;
    console.log(req.body);
    

    try {
        const user = await userModel.create({
            username,
            email,
            password
        });
        const token = await user.generateAuthToken();

        return res.status(201).json({token, user});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports.loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        const token = await user.generateAuthToken();

        return res.status(200).json({token, user});
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
}