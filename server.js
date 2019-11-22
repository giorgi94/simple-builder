const path = require("path");
const express = require("express");

const server = express();

const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || 3000;

server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "templates"));

server.use('/static', express.static('dist'))

server.get("/", (req, res) => {
    res.render("index")
});

server.listen(PORT, HOST, () => {
    console.log(`\nlistening to port ${HOST}:${PORT}\n`);
});