import mongoose from "mongoose";

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://georgiDS:${password}@cluster1.clrksqh.mongodb.net/?retryWrites=true&w=majority&appName=phonebook`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  // Display all entries
  Person.find({}).then((result) => {
    console.log(`phonebook has ${result.length} entries`);
    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  // Add new entry
  const name = process.argv[3];
  const number = process.argv[4];

  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then(() => {
    console.log(`added person to phonebook`);
    mongoose.connection.close();
  });
} else {
  console.log("Invalid number of arguments");
  console.log("To add a person: node mongo.js <password> <name> <number>");
  console.log("To list all persons: node mongo.js <password>");
  mongoose.connection.close();
}
