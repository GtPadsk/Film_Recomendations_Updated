import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import UserModel from '../model/user.js';

import userValidationSchema from '../utils/validation.js';

const SIGN_IN = async (req, res) => {
    try {

        const { error } = userValidationSchema.validate(req.body);
        if (error) {
            const errorMessage = error.details[0].message;
            return res.status(400).json({ message: errorMessage });
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = {
            id: uuidv4(),
            name: req.body.name,
            email: req.body.email,
            password: hash,
        };

        const user = new UserModel(newUser);
        const response = await user.save();

        return res
            .status(201)
            .json({ message: "User was created", user: response });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server Error" });
    }
}

const LOGIN = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            return res.status(401).json({ message: "Data not found" });
        }

        const isPasswordMatch = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Password is incorrect" });
        }

        const token = jwt.sign(
            { email: user.email, id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "12h" }
        )

        return res.status(200).json({ message: "successfull login", token: token })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server Error" });
    }
}


export {
    SIGN_IN,
    LOGIN,
}


