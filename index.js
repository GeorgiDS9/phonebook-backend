import express from "express";
import morgan from "morgan";
const app = express();

app.use(express.json());
app.use(express.static("dist"));

app.use(morgan("tiny"));

let phonebookList = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

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

// API ENDPOINTS

app.get("/api/persons", (request, response) => {
  response.json(phonebookList);
});

app.get("/info", (request, response) => {
  const currentTime = new Date();
  const entriesCount = phonebookList.length;
  response.send(`
    <p>Phonebook has info for ${entriesCount} people</p>
    <p>${currentTime}</p>
  `);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = phonebookList.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  phonebookList = phonebookList.filter((person) => person.id !== id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name and number are required",
    });
  }
  if (phonebookList.find((person) => person.name === body.name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    id: String(Date.now() + Math.floor(Math.random() * 10000) + 1),
    name: body.name,
    number: body.number,
  };
  console.log("Created new person:", person);
  phonebookList = phonebookList.concat(person);
  response.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
