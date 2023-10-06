import express from "express";
import { createUser, getUserByEmail } from "../db/users";
import { generateAuth, random } from "../utils/helper"

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.sendStatus(400)
        }

        const user = await getUserByEmail(email).select("+authentication.salt +authentication.password");

        if (!user) {
            return res.sendStatus(400);
        }

        const expectedHash = generateAuth(user.authentication.salt, password)
        if (user.authentication.password !== expectedHash) {
            return res.sendStatus(403)
        }

        const salt = random()
        user.authentication.sessionToken = generateAuth(salt, user._id.toString())
        await user.save();

        res.cookie("APP-AUTH", user.authentication.sessionToken, { domain: 'localhost', path: '/' })

        return res.status(200).json(user).end();
    } catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, username, gender, age } = req.body
        if ( !email || !password || !username || !gender ) {
            return res.sendStatus(400);
        }

        const existingUser = await getUserByEmail(email)
        if (existingUser) {
            return res.sendStatus(400)
        }

        const salt = random()
        const user = await createUser({
            email,
            username,
            gender,
            age,
            authentication: {
                salt,
                password: generateAuth(salt, password)
            }
        })
        return res.status(200).json(user).end()
    } catch(error) {
        console.error(error)
        return res.sendStatus(400)
    }
}