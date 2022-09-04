const socket = io()

socket.on("from-server-mensajes", mensajes =>{
    renderMensaje(mensajes);
})


const renderMensaje = (mensajes)=>{
    const inputChat = document.querySelector("#chat");
    const mensajesEnviados = mensajes.map(msj =>{
        return `<div>
                    <span style="color:blue;">${msj.mail}</span>
                    <span> - </span>
                    <span style="color:red;">${msj.hora} </span>
                    <span>:</span>
                    <span> </span>
                    <span style="color:green;">${msj.msg} </span>
                </div>`
    })


    inputChat.innerHTML = mensajesEnviados;
}


const enviarMensaje = ()=>{
    const inputMail= document.querySelector("#mail");
    const inputMsg = document.querySelector("#msg");

    const mensaje = {
        mail: inputMail.value,
        hora: new Date(),
        msg: inputMsg.value,
    }
    socket.emit("from-client-mensajes", mensaje);
}






socket.on("update-productos", (productos) =>{
    console.log(productos);
})