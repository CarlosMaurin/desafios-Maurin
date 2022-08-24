//------------------MODULOS---------------------------//
const express = require("express");
const path = require("path");
//-----------------SERVER------------------------------//

const app = express();

//----------------MIDDLEWARES--------------------------//

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname + "/public")))


//-----motor de plantilla hbs-----------//


app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "pug")


//----------------RUTAS-------------------------------//

const DB_PRODUCTOS = [];

app.get('/', (req, res)=>{
    res.render('vista-form', {DB_PRODUCTOS});
});

app.get("/productos", (req, res)=>{
    res.render("vista-hist", {DB_PRODUCTOS});
})

app.post('/productos', (req, res)=>{
    DB_PRODUCTOS.push(req.body);
    console.log(DB_PRODUCTOS);
    res.redirect('/');
});

// app.delete("/productos", (req, res)=>{
//     let arrayLength = DB_PRODUCTOS.length;
//     DB_PRODUCTOS.splice(0, arrayLength);
//     console.log(arrayLength);
//     res.send(DB_PRODUCTOS.length = 0);
//     res.send(DB_PRODUCTOS);
//     console.log(DB_PRODUCTOS);
//     res.redirect('/');
// })



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