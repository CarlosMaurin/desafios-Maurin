const express = require("express");
const routerProductos = express.Router();

// DB //

const DB_PRODUCTOS = [];


routerProductos.get("/", (req, res) =>{
    res.status(200).json(DB_PRODUCTOS);
});

routerProductos.get("/:id", (req, res)=>{
    try {
        const id = req.params.id;
        const productoIndex = DB_PRODUCTOS.findIndex(ind => ind.id == id);
        
        if(productoIndex == -1){
        res.status(404).json({Error: "producto no encontrado"});
        }else{
            res.status(200).json(DB_PRODUCTOS[productoIndex]);
        }


    } catch (error) {
        res.status(500).json({
            code: 500,
            msg: `Error al obtener ${req.method} ${req.url}`
        })
    }
})

routerProductos.post("/", (req, res)=>{
    DB_PRODUCTOS.push({id: DB_PRODUCTOS.length + 1, ...req.body})
    res.status(201).json({msg: "Producto agregado con exito", data: req.body})
});


routerProductos.put("/:id", (req, res)=>{
    try {
        const id = req.params.id;
        const actualizarProd = DB_PRODUCTOS.find(ind => ind.id == id);
        const {nombre, price, thumbnail} = req.body;

        if(actualizarProd == undefined){
        res.status(404).json({Error: "producto no encontrado"});
        }else{
            actualizarProd.nombre = nombre;
            actualizarProd.price = price;
            actualizarProd.thumbnail = thumbnail;

            res.status(201).json({msg: "Producto actualizado"});
        }
    } catch (error) {
        res.status(500).json({
            code: 500,
            msg: `Error al obtener ${req.method} ${req.url}`
        })
    }
})

routerProductos.delete("/:id", (req, res)=>{
    try {
        const id = req.params.id;
        const eliminarProducto = DB_PRODUCTOS.find(ind => ind.id == id);

        if(eliminarProducto == undefined){
        res.status(404).json({Error: "producto no encontrado"});
        }else{
            DB_PRODUCTOS.splice(eliminarProducto, 1);
            res.status(201).json(eliminarProducto);
        }
    } catch (error) {
        res.status(500).json({
            code: 500,
            msg: `Error al obtener ${req.method} ${req.url}`
        })
    }
})



module.exports = routerProductos;