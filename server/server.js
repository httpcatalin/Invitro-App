require("dotenv").config({ path: "./.env.local" });
const express = require("express");
const app = express();
const dbConnection = require("./config/dbConnection");
const userRoutes = require('./routes/userRoutes');

const cors = require('cors');
app.use(cors());

app.use(express.json());

app.use('/home', (req, res) => {
  res.send("Welcome");
});

app.use('/', userRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on port ${process.env.PORT || 3000}!`);
  dbConnection();
});
