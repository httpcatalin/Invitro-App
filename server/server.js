require("dotenv").config({ path: "./.env.local" });
const express = require("express");
const app = express();
const dbConnection = require("./config/dbConnection");
const cors = require('cors');
const otpRoutes = require('./routes/otpRoutes');

app.use(express.json());
app.use(cors());

app.use('/', otpRoutes);

app.listen(process.env.PORT || 3000,  () => {
  console.log(`Server started on port ${process.env.PORT || 3000}!`);
  dbConnection();
});
