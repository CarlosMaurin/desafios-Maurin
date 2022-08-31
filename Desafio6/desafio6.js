//----------------MODULOS--------------------//
const express = require("express");
const path = require("path");
const {Server: HttpServer} = require("http");
const {Server: IOServer} = require("socket.io");
const exphbs = require("express-handlebars");




//--------------instancia de servidor------------//

const app = express();
const httpServer = new HttpServer(app);  //handshake//
const io = new IOServer(httpServer); //handsake//

//---------------MIDDLEWARES-------------------//

app.use(express.static(path.join(__dirname, "/public"))); //para renderizar el index.html
app.use(express.json());
app.use(express.urlencoded({extended: true}));



//----------------BASE de DATOS----------------//
const DB_PRODUCTOS =[];
const DB_MENSAJES = [];


//-----motor de plantilla hbs-----------//


app.engine("hbs", exphbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get('views'), '/layouts'),
    partialsDir: path.join(app.get('views'), '/partials'),
    extname: 'hbs'
}))
app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "hbs")



//-----------------RUTAS----------------------//


app.get("/", (req, res)=>{
    // res.sendFile(path.join(__dirname, "public", "index.html"));
    res.render("vista");

})
app.post("/productos", (req, res)=>{
    DB_PRODUCTOS.push(req.body);

    res.redirect("/");
    
})


//----------------------SERVIDOR------------------------//

const PORT = 3000;
const server = httpServer.listen(PORT, ()=>{
    console.log(`Escuchando servidor en puerto http://localhost:${PORT}`);
})


//-----------------------WEBSOKET----------------------//

io.on("connection", (socket)=>{
    console.log(`nuevo cliente encontrado" ${socket.id}`)

    io.sockets.emit("from-server-mensajes", DB_MENSAJES) //por convención se usa from-server-mensajes
    //sirve para enviar lo acumulado hasta ahora

    socket.on("from-client-mensajes", mensaje =>{
        DB_MENSAJES.push(mensaje);
        io.emit("from-server-mensajes", DB_MENSAJES);
    })

    io.sockets.emit("from-server-producto", DB_PRODUCTOS);

    socket.on("from-client-producto", producto =>{
        DB_PRODUCTOS.push(producto);
        io.emit("from-server-producto", DB_PRODUCTOS)
    })
})