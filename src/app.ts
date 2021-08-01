import "./setup";

import express from "express";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "./database";

import * as optionsController from "./controllers/optionsController";
import * as insertionsController from "./controllers/insertionsController";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/inicio", optionsController.getOptions);
app.get("/send", optionsController.getTeacherSubject);
app.post("/send", insertionsController.newTest);
app.get("/disciplines/:id", optionsController.getTestsById);
//app.get("/teachers/:teacherId/:subjectId", )

export async function init () {
  await connectDatabase();
}

export default app;
