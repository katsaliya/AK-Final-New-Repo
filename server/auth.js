import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import express from 'express';
import { createUser, getUser } from "./data/users.js";
dotenv.config();
const authRouter = express.Router();
const saltRounds = 12;

authRouter.post('/users', async (req, res) => {
    const {user, password} = req.body;

    const userRecord = await getUser(user);
    if(userRecord){
        res.status(500).json({"error": "user already exists"});
    
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
        await createUser(user, hashedPassword);
        res.status(200).json({"message": `created ${user}`});
    } catch (e) {
        res.status(500).json({"error": message});
    }
});

authRouter.post("/login", async (req, res) => {
    const {user, password} = req.body;

    try {
        const userRecord = await getUser(user);
        const match = await bcrypt.compare(password, userRecord.hashedPassword);

        if(match){
            res.json({message: 'Login Successful'});
        } else {
            res.status(500).json({"error": "error loggin in"});
        }
    } catch(e){
        res.status(500).json({"error": e.message});
        return;
    }
});

export {authRouter};