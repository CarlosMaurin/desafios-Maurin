//------------------MODULOS---------------------------//
const express = require("express");
const morgan = require("morgan");
//-----------------SERVER------------------------------//

const app = express();
const routerProductos = require("./src/routes/productos.routes.js");

//----------------MIDDLEWARES--------------------------//

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"))


//----------------RUTAS-------------------------------//
app.use("/api/productos", routerProductos)






app.get("*", (req, res)=>{
    res.status(404).json({
        code: 404,
        msg: "not found"
    })
})



//------------------LEVANTAR SERVIDOR-------------------//

const PORT = 8080;
const server = app.listen(PORT, ()=>{
    console.log(`estamos escuchando el servidor http://localhost:${PORT}`)
});
server.on("error", error =>{
    console.log(`Error en el servidor ${error}`)
});