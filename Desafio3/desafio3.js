const express = require("express");
const Desafio2Articulos = require("../Desafio2/desafio2Articulos.js");

const articulos = new Desafio2Articulos("../Archivos/desafio2Articulos.json");
const app = express();


app.get("/productos", async (request, response)=>{
    const productos = await articulos.nombreProd();
    response.send(`Estos son los productos: ${productos}`);
})

app.get("/productoRandom", async (request, response)=>{
    const randProd = JSON.stringify(await articulos.randomProd());
    response.send(`El producto random es: ${randProd}`);
})

app.get("*", (request, response)=>{
    response.send("404 - Page not found");
})

const server = app.listen(3000, ()=>{
    console.log("servidor http escuchado en http://localhost:3000/");
})


