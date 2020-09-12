require("./db/connection");
require("./models/user")
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Income = require("./models/incomes");
const Expense = require("./models/expenses");
const userRoute = require("./routes/userRoute");
const incomeRoute = require("./routes/incomeRoute");
const expenseRoute = require("./routes/expenseRoute");
const auth = require("./middleware/auth");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json())

app.use(userRoute);
app.use(incomeRoute);
app.use(expenseRoute);

app.get("/", auth, (req, res) => {
    res.send("Authorized");
})

mongoose.connection.on("connected", () => {
    console.log('db connected successfully.');
})

mongoose.connection.on("error", () => {
    console.log("error connecting to db.");
})

app.listen(port, () => {
    console.log(`App is listening to port ${port}`);
} )