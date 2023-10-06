import express from "express";
import {get, merge} from "lodash";

import { getUserBySessionToken } from "../db/users";

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction)=> {
    try {
        const { id } = req.params;
        const currID = get(req, "identity._id") as string

        if (!currID) {
            return res.sendStatus(403);
        }

        if (currID.toString() !== id) {
            return res.sendStatus(403)
        }

        next();
    } catch (error) {

    }
}

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies["APP-AUTH"];
        if (!sessionToken) {
            return res.sendStatus(400);
        }
        const existUser = await getUserBySessionToken(sessionToken);

        if (!existUser) {
            return res.sendStatus(403)
        }
        //TODO
        merge(req, {identity: existUser});

        next()
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}