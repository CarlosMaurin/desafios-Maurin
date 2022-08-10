class Usuario {
    constructor(nombre, apellido){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        this.mascotas = []

    }

    getFullName = () =>{
        console.log(`Su nombre es ${usuario.nombre} y su apellido es ${usuario.apellido}`)
    }

    addMascota = (nombreMascota)=>{
        usuario.mascotas.push(nombreMascota);
        console.log(usuario.mascotas);
    }

    conuntMascotas= () =>{
        console.log(usuario.mascotas.length);
    }

    addBook= (string1, string2) =>{
        usuario.libros.push({
            nombre: string1,
            autor: string2
        })
        console.log(usuario.libros);
    }

    getBookNames= () =>{
        const nombreLibro = usuario.libros.map(item =>{
            return item.nombre;
        })
        console.log(nombreLibro);
    }
}

const usuario = new Usuario("Carlos", "Maurin")
usuario.getFullName();
usuario.addMascota("pepe");
usuario.conuntMascotas();
usuario.addBook("La IPA no pasa de moda", "Hernán Castellani");
usuario.getBookNames();
