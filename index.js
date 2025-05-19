import express from "express";
import morgan from "morgan";
const app = express();

app.use(express.json());
app.use(morgan("tiny"));

const phonebookList = [
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

// app.get("/api/notes", (request, response) => {
//   response.json(notes);
// });

// app.post("/api/notes", (request, response) => {
//   const body = request.body;
//   if (!body.content) {
//     return response.status(400).json({
//       error: "content missing",
//     });
//   }

//   const note = {
//     id: String(notes.length + 1),
//     content: body.content,
//     important: body.important || false,
//   };
//   console.log("Created new note:", note);
//   notes = notes.concat(note);
//   response.json(note);
// });

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
