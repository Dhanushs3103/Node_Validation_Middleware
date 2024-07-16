// packages
import express from "express";

let server = express();
let PORT = 3001; // specifing port number.

server.use(express.json()); // using inbuilt middleware for parsing request body.

// function to check the whether the request body has proper format.
function formatValidator(req, res, next) {
  let { ID, Name, Rating, Description, Genre, Cast } = req.body; // destructuring the items of req.body object.

  let errors = [];

  // checking if ID is number or not.
  if (typeof ID !== "number") {
    errors.push("ID should be a number");
  }

  //checking if Name is string or not.
  if (typeof Name !== "string") {
    errors.push("Name should be a string");
  }

  //checking if Rating is Number or not.
  if (typeof Rating !== "number") {
    errors.push("Rating should be a number");
  }

  //checking if Description is string or not.
  if (typeof Description !== "string") {
    errors.push("Description should be a string");
  }

  //checking if Genre is string or not.
  if (typeof Genre !== "string") {
    errors.push("Genre should be a string");
  }

  //checking if Cast is an Array or not.
  if (!Array.isArray(Cast)) {
    errors.push("Genre should be a string.");
  } else if (!Cast.every((element) => typeof element === "string")) { // checking every element in an array is string or not.
    errors.push("Each item of Cast array should be a string.");
  }

  if(errors.length > 0) {
    return res.status(400).json({ message: 'bad request. some data is incorrect.', errors });
  }

  next();
}
// API endpoint for post request along with formatValidator middleware in action.
server.post("/", formatValidator, (req, res) => {
  res.status(200).send("data received");
});

// server is listening at port 3001
server.listen(PORT, () => {
  console.log(`server is listening at port ${PORT}`);
});
