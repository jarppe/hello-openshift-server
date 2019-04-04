"use strict";


const express = require("express");
const os = require("os");


const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";


const app = express();


app.get("/", (req, resp) => {
  resp.json({ message: "Hello" });
});


app.get("/info", (req, resp) => {
  const ips = Object
    .values(os.networkInterfaces())
    .flatMap(v => v)
    .filter(v => v.family === "IPv4" && !v.internal)
    .map(v => v.address);

  resp.json({
    headers: req.headers,
    ips,
  });
});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}...`);
