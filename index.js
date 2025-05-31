import express from "express";
import morgan from "morgan";
import "dotenv/config";
import Person from "./models/person.js";

const app = express();

app.use(express.json());
app.use(express.static("dist"));

app.use(morgan("tiny"));

// Create custom token for request body
morgan.token("postData", (req) => {
  // Only show body for POST requests
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
  return " ";
});

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :postData"
  )
);

// Add error handler middleware
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

// API ENDPOINTS

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/info", (request, response) => {
  Person.countDocuments({}).then((count) => {
    const currentTime = new Date();
    response.send(`
      <p>Phonebook has info for ${count} people</p>
      <p>${currentTime}</p>
    `);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  });
});

app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndRemove(request.params.id).then(() => {
    response.status(204).end();
  });
});

app.post("/api/persons", async (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name and number are required",
    });
  }

  const existingPerson = await Person.findOne({ name: body.name });
  if (existingPerson) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(errorHandler);
