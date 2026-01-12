import express from "express";
import mongoose from "mongoose";
import config from "./utils/config.js";
import logger from "./utils/logger.js";
import middleware from "./utils/middleware.js";
import personsRouter from "./controllers/persons.js";
import Person from "./models/person.js";

const app = express();

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/persons", personsRouter);

app.get("/info", (request, response) => {
  Person.countDocuments({}).then((count) => {
    const currentTime = new Date();
    response.send(`
      <p>Phonebook has info for ${count} people</p>
      <p>${currentTime}</p>
    `);
  });
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
