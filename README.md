- with a fluree ledger running on 8090
- and a ledger named test/test created

- install packages
  `npm install`

- run express
  `node index.js`

- should be able to make a get request to `http://localhost:3000/query` showing `[]`
- transact `[{"_id": "_user", "username": "test"}]` in the adminUI and your see this user in the results of your next get request
