import express from "express";

import {deleteUserByID, getAllUsers, getUserByID} from "../db/users"

export const getUsersAll = async (req: express.Request, res: express.Response)=> {
    try {
        const users = await getAllUsers();

        return res.status(200).json(users)
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

export const deleteUser = async (req: express.Request, res: express.Response)=> {
    try {
        const { id } = req.params;

        const deletedUser = await deleteUserByID(id);

        return res.status(200).json(deletedUser)
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updateUser = async (req:express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { username } = req.body;
        if (!username) {
            return res.sendStatus(400)
        }

        const user = await getUserByID(id);
        user.username = username;
        await user.save();

        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
}