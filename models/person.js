import mongoose from "mongoose";
import config from "../utils/config.js";
import logger from "../utils/logger.js";

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        // Regex explanation:
        // ^        - start of string
        // \d{2,3}  - 2 or 3 digits (first part)
        // -        - literal dash
        // \d+      - one or more digits (second part)
        // $        - end of string
        return /^\d{2,3}-\d{7,8}$/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid phone number! Phone number must be in format XX-XXXXXXX or XXX-XXXXXXX`,
    },
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model("Person", personSchema);
