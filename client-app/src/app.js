const { getUsers, getUserById } = require("./api/users");

// getUsers().then((users) => {
//   console.log(users);
// });

getUserById(100).then((user) => {
  console.log(user);
});
