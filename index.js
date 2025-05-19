import express from "express";
import morgan from "morgan";
const app = express();

app.use(express.json());
app.use(morgan("tiny"));

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true,
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
  {
    id: "4",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
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

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.post("/api/notes", (request, response) => {
  const body = request.body;
  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    id: String(notes.length + 1),
    content: body.content,
    important: body.important || false,
  };
  console.log("Created new note:", note);
  notes = notes.concat(note);
  response.json(note);
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
