import express from "express"

import { register } from "../controller/auth"

export default (router: express.Router) => {
    router.post("/auth/register", register)
}