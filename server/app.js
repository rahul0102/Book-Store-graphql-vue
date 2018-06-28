const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");

const dbConfig = require("./config.js").db;
const schema = require("./schema/schema.js");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB ==========
mongoose.connect(
  `mongodb://${dbConfig.user}:${dbConfig.password}@ds163680.mlab.com:63680/graphql-test`
);

mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
});

app.use(cors());
// Use graphql middleware
app.use("/graphql-api", graphqlHTTP({
    // schema of graph
    schema: schema,
    graphiql: true //gui tool for graphql
}));

// Creating server ==========
app.listen(PORT, () => {
    console.log("The server is listening on port -> ", PORT);
});
