"use strict"
import dotenv from 'dotenv'; dotenv.config();
import mongoose from "mongoose";
import { Person } from "./models/Person.js"; export { Person };
import { Course } from "./models/Course.js"; export { Course };
import { Book } from "./models/Book.js"; export { Book };

export async function connect() {
  const connectionString = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOSTNAME}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
  await mongoose.connect(connectionString);
}

export async function disconnect() {
  await mongoose.disconnect();
}

mongoose.connection.on('error', (err) => console.log(">> Error ", err) || process.exit(0));
mongoose.connection.on('connecting', () => console.log(`>> Connecting to ${process.env.DB_NAME}`))
mongoose.connection.on('connected', () => console.log(">> Connected"))
mongoose.connection.on('disconnecting', () => console.log(">> Disconnecting"))
mongoose.connection.on('disconnected', () => console.log(">> Disconnected"))

export async function deleteAllCollectionEntries() {
  await Person.deleteMany();
  await Course.deleteMany();
  await Book.deleteMany();
}