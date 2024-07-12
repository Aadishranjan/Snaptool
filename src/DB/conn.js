const mongoose = require("mongoose");

require('dotenv').config();
const URI = process.env.MONGODB_URI;


mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connection to the online database was successful");
}).catch((e) => {
  console.error("Failed to connect to the online database");
  console.error(`Error name: ${e.name}`);
  console.error(`Error message: ${e.message}`);
  console.error(`Error stack: ${e.stack}`);
});
