const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(express.static("public"));
app.use(cors());

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true, limit: "150mb" }));
app.use(bodyParser.json());

app.use(routes);

const port = process.env.PORT || 4010;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
