import User from "../models/userModels.js";
import bcrypt from 'bcryptjs';
import { generateToken } from "../utils.js";

export const userSignIn = async(req, res) => {
    const user = await User.findOne({ username: req.body.username });
        if(user) {
            if(bcrypt.compareSync(req.body.password, user.password)) {
                res.send({
                    _id: user._id,
                    username: user.username,
                    token: generateToken(user)
                });
                return;
            }
    }
    res.status(401).send({ message: 'Invalid username or password' });
}

export const userRegister = async(req, res) => {
    const userExist = await User.findOne({ username: req.body.username });
    if(!userExist) {
        const newUser = new User( {
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password)
        });
        const user = await newUser.save();
        res.send({
            _id: user._id,
            username: user.username,
            token: generateToken(user)
        });

    }
    else {
        res.status(401).send( {message: 'Username already exist' } );
    }
}