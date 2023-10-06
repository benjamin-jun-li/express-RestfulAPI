import express from "express";

import {deleteUser, getUsersAll, updateUser} from "../controller/users";
import {isAuthenticated, isOwner} from "../middlewares";

export default (router: express.Router) => {
    router.get("/users", isAuthenticated, getUsersAll);
    router.delete("/users/:id", isAuthenticated, isOwner, deleteUser);
    router.put("/users/:id", isAuthenticated, isOwner, updateUser)

}
