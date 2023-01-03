const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "04c76fd16be22a1f31a48b951075d4e91cb44165c8a808e677861aae6aeb3364e399033bd9457baef8f42634ccffcb5cfc47d0b324de1103e03c78dab85a13f267": 100,
  "04f355a4261b6e1c35a4fe58022d9219f0f1db080d81e4fb14e50609afd1f8c8888dcac8aef9231a21366dceec07a3806ee13ec732ebb40f0469365c56ef16a6be": 50,
  "04f847bfb78b024b0be8eeab30bc692004b30935d3426b84c26e6ae53f4ccd633d3170f10208de9105f70fe6b4a4dc6604a92e5699c764c54034a9494b5386c768": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
