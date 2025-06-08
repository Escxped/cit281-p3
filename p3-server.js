const express = require("express");
const app = express();
const path = require("path");

const { coinCombo, coinValue } = require("./p3-module");

const PORT = 8080;
const HOST = "localhost";

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Route: /coincombo?amount=###
app.get("/coincombo", (req, res) => {
  const amount = parseInt(req.query.amount);

  if (isNaN(amount) || amount < 0) {
    return res.json({ error: "Invalid or missing amount query parameter" });
  }

  const result = coinCombo(amount);
  res.json(result);
});

// Route: /coinvalue?coins...
app.get("/coinvalue", (req, res) => {
  const {
    pennies = 0,
    nickels = 0,
    dimes = 0,
    quarters = 0,
    halves = 0,
    dollars = 0,
  } = req.query;

  const result = coinValue({
    pennies: parseInt(pennies) || 0,
    nickels: parseInt(nickels) || 0,
    dimes: parseInt(dimes) || 0,
    quarters: parseInt(quarters) || 0,
    halves: parseInt(halves) || 0,
    dollars: parseInt(dollars) || 0,
  });

  res.json(result);
});

// 404 fallback route
app.use((req, res) => {
  res.status(404).send("404 - Not Found");
});

// Start the server
app.listen(PORT, HOST, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});
