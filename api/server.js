const express = require("express");

const Exotics = require("./exotics/exotics-model");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/exotics", (req, res) => {
 Exotics.getAll()
    .then(exotics => {
      res.status(200).json(exotics);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.get("/exotics/:id", (req, res) => {
  Exotics.getById(req.params.id)
    .then(exotic =>{
        res.status(200).json(exotic)
    })
    .catch(err =>{
        res.status(500).json(err)
    })
});

server.post("/exotics", (req, res) => {
 Exotics.add(req.body)
    .then(exotic => {
      res.status(200).json(exotic);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.delete("/exotics/:id", (req, res) => {
    Exotics.remove(req.params.id)
       .then(exotic => {
         res.status(200).json(exotic);
       })
       .catch(error => {
         res.status(500).json(error);
       });
   });

module.exports = server;
