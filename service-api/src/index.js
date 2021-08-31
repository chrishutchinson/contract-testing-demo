const express = require("express");
const { users } = require("./fixtures/users");

const app = express();

app.get("/api/users", (req, res) => {
  res.statusCode = 200;
  res.json({
    data: users,
  });
});

app.get("/api/users/:id", (req, res) => {
  const user = users.find((user) => user.id === Number(req.params.id));

  if (!user) {
    res.statusCode = 404;
    res.end();
    return;
  }

  res.statusCode = 200;
  res.json({
    data: user,
  });
});

app.listen(3000, () => {
  console.log("Service API listening on port 3000");
});
