const express = require("express");
const flureenjs = require("@fluree/flureenjs");
const { application } = require("express");
const flureeServerUrl = "http://localhost:8090";
const ledger = "test/test";
var flureeDbConn;

const app = express();
const port = 3000;

async function flureeConn() {
  if (!flureeDbConn) {
    flureeDbConn = await flureenjs.connect(flureeServerUrl);
  }
  return flureeDbConn;
}

app.get("/query", async (req, res) => {
  const conn = await flureeConn();
  const db = await flureenjs.db(conn, ledger);
  const myQuery = {
    select: ["*"],
    from: "_user",
  };

  const results = await flureenjs.query(db, myQuery);
  res.send(results);
});

app.post("/transact-user", async (req, res) => {
  const conn = await flureeConn();
  const transaction = [{ _id: "_user", username: "jake" }];

  const results = await flureenjs.transact(conn, ledger, transaction);
  res.send(results);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
