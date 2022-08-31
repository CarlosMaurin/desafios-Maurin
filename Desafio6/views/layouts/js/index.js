


const socket = io(); //levantamos la conexion desde el lado del cliente


//recibo el mensaje emitido por el servidor
socket.on("from-server-mensajes", mensajes =>{
    render(mensajes);
});

const render = (mensajes)=>{
    const inputChat = document.querySelector("#historialChat");

    const mensajesEnviados = mensajes.map(msj =>{
    
    return `<div>
        <span style="color:blue;">${msj.mail}</span><span> - </span><span style="color:red;">${msj.hora} </span><span>:</span><span> </span><span style="color:green;">${msj.texto} </span>
        </div>`
    })
    inputChat.innerHTML = mensajesEnviados;

}


// envio el msj del cliente al servidor al presionar el boton enviar
const enviarMensaje= ()=>{
    const inputMail = document.querySelector("#mail");
    const inputContenido = document.querySelector("#contenidoMensaje");

    const mensaje= {
        mail: inputMail.value,
        hora: new Date(),
        texto: inputContenido.value
    }
    socket.emit("from-client-mensajes", mensaje);
}






socket.on("from-server-producto", productos =>{
    return productos;
});

// const renderProd= (productos)=>{
//     const inputHistorial = document.querySelector("#historialProductos");
//     const historialProductos = productos.map(prod =>{
//         if(productos.length >0){
//             return `
//             <div class="container mt-3">
//                 <div class="jumbotron">
//                     <div class="table-responsive">
//                         <table class="table table-dark">
//                             <tr style="color: yellow;"> <th>Nombre</th> <th>Precio</th> <th>Foto url</th></tr>
//                             <tr>
//                                 <td>${prod.nombre}</td>
//                                 <td>${prod.precio}</td>
//                                 <td>
//                                     <img width="30" src="${prod.url}" alt="">
//                                 </td>
//                             </tr>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//             `
//         }else{
//             return `
//                 <div class="container mt-3">
//                     <h3 class="alert alert-warning">No se encontraron productos</h3>
//                 </div>
//             `
//         }

//     });
//     inputHistorial.innerHTML = historialProductos;
// };

const enviarProducto = ()=>{
    const inputNombre = document.querySelector("#nombre");
    const inputPrecio = document.querySelector("#precio");
    const inputUrl = document.querySelector("#url");

    const producto = {
        nombre: inputNombre.value,
        precio: inputPrecio.value,
        url: inputUrl.value
    }
    socket.emit("from-client-producto", producto);
}
