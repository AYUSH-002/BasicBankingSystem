const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const ejs = require("ejs");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const { indexController } = require("./controllers/indexController");
const {customerDisplayController,} = require("./controllers/customerDisplayController");
const {customerAddController,} = require("./controllers/customerAddController");
const { addFundsController } = require("./controllers/addFundsController");
const { withdrawController } = require("./controllers/withdrawController");
const {displayTransactionsController,} = require("./controllers/displayTransactionsController");
const {transferFundsController,} = require("./controllers/transferFundsController");

app.use(cors());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

const connection = mongoose.connect(
  `mongodb+srv://022003ayush:${process.env.DATABASE_PASSWORD}@cluster0.xs6iauh.mongodb.net/BasicBankSystem?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

connection
  .then((response) => {
    console.log("Database has been connected!");
    app.listen(PORT, () => {
      console.log(`Server running on Port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", indexController);
app.get("/customers/:id", customerDisplayController);
app.get("/customers/:id/transactions", displayTransactionsController);
app.post("/customers/:id/addFunds", addFundsController);
app.post("/customers/:id/withdrawFunds", withdrawController);

app.post("/customers/:id/transferFunds", transferFundsController);

app.post("/customers", customerAddController);
