const express = require("express");
const Desafio2Articulos = require("../Desafio2/desafio2Articulos.js");

const articulos = new Desafio2Articulos();
const app = express();


app.get("/productos", (request, response)=>{
    response.send(articulos.getAll());
})

app.get("/productoRandom", (request, response)=>{
    response.send(articulos.randomProd());
})

app.get("*", (request, response)=>{
    response.send("404 - Page not found");
})

const server = app.listen(3000, ()=>{
    console.log("servidor http escuchado en http://localhost:3000/");
})


