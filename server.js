const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const bip39 = require("bip39");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const users = {};

// Registration
app.post("/register", (req, res) => {
  const { fullName, username, password } = req.body;

  if (users[username]) {
    return res.send("Username already exists!");
  }

  users[username] = { fullName, password };
  res.send('Registration successful! <a href="/login.html">Login</a>');
});

// Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users[username];

  if (!user || user.password !== password) {
    return res.send("Invalid username or password.");
  }

  // Generate real 12-word seed phrase
  const mnemonic = bip39.generateMnemonic();

  // Generate public address (simple SHA256 hash of username)
  const publicAddress = crypto
    .createHash("sha256")
    .update(username)
    .digest("hex");

  res.send(`
        <h1>Welcome ${username}!</h1>
        <p><strong>Seed Phrase:</strong> ${mnemonic}</p>
        <p><strong>Public Address:</strong> ${publicAddress}</p>
    `);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
