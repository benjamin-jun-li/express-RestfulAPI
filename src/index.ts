import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import * as process from "process";
import { config } from "dotenv";
import router from "./router";

// read .env
config();

const app = express()

app.use(cors({
    credentials: true,
}))

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app)

server.listen(5050, () => {
    const url = "http://localhost:5050/"
    console.log(`server is listening on ${url}`)
})

const MONGO_URL = process.env.DB_CONN
mongoose.Promise = Promise
mongoose.connect(MONGO_URL).then()
mongoose.connection.on("error", (error: Error) => console.log(error))

app.use('/', router())