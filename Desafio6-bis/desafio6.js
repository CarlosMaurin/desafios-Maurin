//-----------modulos------------//
const express = require("express");
const path = require("path");
const {Server: HttpServer} = require("http");
const {Server: IOServer} = require("socket.io");
const exphbs = require("express-handlebars");



//-----------instancia servidor -----------//
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


//----------middlewares------------------//
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({extended: true}));



//----------base de datos----------------//
DB_PRODUCTOS=[];
DB_MENSAJES=[{
    mail: "HOST@host.com",
    hora: new Date(),
    msg: "BIENVENIDOS AL SERVICIO DE MENSAJERIA DIRECTA"
}];


//-----motor de plantilla hbs-----------//


app.engine("hbs", exphbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get('views'), '/layouts'),
    partialsDir: path.join(app.get('views'), '/partials'),
    extname: 'hbs'
}))
app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "hbs");



//------------rutas-------------------//
app.get("/", (req, res)=>{
    res.render("vista", {DB_PRODUCTOS});
});

app.post("/productos", (req, res)=>{
    DB_PRODUCTOS.push(req.body);
    
    res.redirect("/productos");

    io.sockets.emit("update-productos", req.body);
});

app.get("/productos", (req, res)=>{
    res.render("vista", {DB_PRODUCTOS});
});




//------------servidor-----------------//

PORT = 3000;
const server = httpServer.listen(PORT, ()=>{
    console.log(`escuchando servidor en puerto http://localhost: ${PORT}`);
})

//---------------websocket--------------//

io.on("connection", (socket)=>{
    console.log(`nuevo cliente conectado ${socket.id}`);

    io.sockets.emit("from-server-mensajes", DB_MENSAJES);

    socket.on("from-client-mensajes", mensaje =>{
        DB_MENSAJES.push(mensaje);
        io.sockets.emit("from-server-mensajes", DB_MENSAJES);
    })
})



