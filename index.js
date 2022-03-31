const express = require("express");
const app = express();
const port = 3030;

const cors = require("cors");
const morgan = require("morgan");

// SETUP MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const data = require("./data")
// REQUIRE ROUTERS
const usersRouter = require("./src/routers/users");

// ADD ROUTERS TO APP
app.get("/users", (req, res) => {
  res.json({users: data.users})
})

app.delete( "/users/:id", (req, res) => {
  let deletedUser = null
  //delete the user with this id
  data.users = data.users.filter( user => {
    //return false if the user has the same id as the id from the route parameter
    if (user.id === parseInt(req.params.id)) {
        //we don't want this user in the new users array
      deletedUser = user 
      return false
    } else {
      return true
    }
  })

  res.json({user: deletedUser})
})

//PUT is used to UPDATE a record
app.put("/users/:id", (req, res) => {
  //update the user record with that ID
  const existingUser = data.users.find(user=> {
    return user.id == req.params.id
  })

  console.log("Headers:", req.headers)
  console.log("Body:", req.body)

  //Update the user object based on the data from the PUT request
  existingUser.email = req.body.email

  res.json({user: existingUser})
})

/* START SERVER */
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
