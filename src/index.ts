import dotenv from "dotenv";
import express from "express";
import path from "path";
import Server from "./externals/Express";
import "./externals/orm";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

dotenv.config({
  path: path.resolve(__dirname, "..", ".env." + process.env.NODE_ENV),
});

new Server();
