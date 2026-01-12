import mongoose from "mongoose";
import "dotenv/config";

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 2) {
  // Display all entries
  Person.find({}).then((result) => {
    console.log(`phonebook has ${result.length} entries`);
    mongoose.connection.close();
  });
} else if (process.argv.length === 4) {
  // Add new entry
  const name = process.argv[2];
  const number = process.argv[3];

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
  console.log("To add a person: node mongo.js <name> <number>");
  console.log("To list all persons: node mongo.js");
  mongoose.connection.close();
}
