const express = require("express");
const dotenv = require("dotenv");
const server = express();
const authCtrl = require('./controllers/auth');
const verifyJwt = require('./middleware/verifyJwt');

const { getUsers,
    postUsers
} = require("./controllers/users");

const {
    findUserByEmail
} = require("./controllers/activite");

var cors = require('cors');

server.use(cors());

server.use(express.json());
dotenv.config();
const PORT = process.env.PORT;

// public routes
server.post('/auth', authCtrl);
server.post("/users", postUsers);
// protected routes
server.use(verifyJwt)
server.get("/users", getUsers);

server.post("/activites", findUserByEmail);



server.listen(PORT, () => console.log(`Server started on ${PORT}`));