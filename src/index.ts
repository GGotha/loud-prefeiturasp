import path from "path";
import dotenv from "dotenv";
import "./externals/orm";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

dotenv.config({
  path: path.resolve(__dirname, "..", ".env." + process.env.NODE_ENV),
});

import express from "express";

const server = express();

import Server from "./externals/Express";

new Server();
