const fs = require("fs/promises");

class Desafio2Articulos {
    constructor (ruta){
        this.ruta = ruta
    }
    async getAll(){
        try {
            const objs = await fs.readFile(this.ruta, "utf-8");
            return JSON.parse(objs);
        } catch (error) {
            return [];
        }
    };
    // async save(obj){

    //     try {
            
    //         const objs = await this.getAll();
    //         let newId;
    //         if(objs.length === 0){
    //             newId = 1
    //         }else{
    //             newId = objs[objs.length - 1].id + 1;
    //         }

    //         const newObj = {id: newId, ...obj};
    //         objs.push(newObj);
    //         await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));

    //         return "newId:" + newId;

    //     } catch (error) {
    //         console.log("error al guardar");
    //     }

    // };

    // async upDate(id, upDateObj ){
    //     try {
    //         const objs = await this.getAll();
    //         const findId = objs.findIndex(item => item.id == id);

    //         if(findId == -1){
    //             console.log("artículo no encontrado")
    //         }else{
    //             objs[findId] = {id: id, ...upDateObj};
    //             await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));
    //         }
    //         return {id: id, upDateObj}
    //     } catch (error) {
    //         console.log("No se pudo actualizar");
    //     }
    // }

    // async getById(id){
    //     try {
            
    //         const objs = await this.getAll();
    //         const findId = objs.findIndex(item => item.id == id);
    //         if(findId == -1){
    //             console.log("artículo no encontrado");
    //         }else{
    //             return objs[findId];
    //         }
    //     } catch (error) {
    //         console.log("error al buscar id")
    //     }

    // };

    // async deleteById(id){
    //     try {
    //         const objs = await this.getAll();
    //         const findId = objs.findIndex(item => item.id == id);
    //         if(findId == -1){
    //             console.log("artículo no encontrado")
    //         }else{
    //             objs.pop(objs[findId]);
    //             await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));
    //         }
    //         return objs;
    //     } catch (error) {
    //         console.log("Error al eliminar el producto")
    //     }
    // };

    // async deleteAll(){
    //     try {
    //         const objs = await this.getAll();
    //         objs.length = 0;
    //         await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));
    //         return objs;
    //     } catch (error) {
    //         console.log("error al eliminar los artículos");
    //     }
    // };
    async nombreProd(){
        try {
            const objs = await this.getAll();
            let nombres = objs.map(item => item.title);
            return nombres;
        } catch (error) {
            console.log("error");            
        }
    }
    async randomProd(){
        try {
            const objs = await this.getAll();
            let random = Math.floor(Math.random() * objs.length);
            return objs[random];
        } catch (error) {
            console.log("error")
        }
    }
}
async function main(){
    const articulo = new Desafio2Articulos ("../Archivos/desafio2Articulos.json");
    // console.log("consulta de ruta");
    // console.log(articulo.ruta);
    // console.log("primera consulta");
    // console.log(await articulo.getAll());
    // console.log("agregamos articulos");
    // console.log(await articulo.save({title: "anteojos ray ban", price: 15000, thumbnail: "https://http2.mlstatic.com/D_NQ_NP_713939-MLA49636746444_042022-O.webp"}));
    // console.log(await articulo.save({title: "anillo Bulgari", price: 3500, thumbnail: "https://http2.mlstatic.com/D_NQ_NP_732054-MLA49858468287_052022-O.webp"}));
    // console.log(await articulo.save({title: "Reloj de acero", price: 18350, thumbnail: "https://http2.mlstatic.com/D_NQ_NP_601779-MLA49874959748_052022-O.webp"}));
    // console.log("segunda consulta");
    // console.log(await articulo.getAll());
    // console.log("actualizamos articulo 2");
    // console.log(await articulo.upDate(2, {title: "anillo San Benito", price: 3700, thumbnail: "https://http2.mlstatic.com/D_NQ_NP_879476-MLA45614984434_042021-O.webp"}));
    // console.log("tercera consulta");
    // console.log(await articulo.getAll());
    // console.log("buscamos el artículo 1");
    // console.log(await articulo.getById(1));
    // console.log("eliminamos articulo 3");
    // console.log(await articulo.deleteById(3));
    // console.log("eliminamos todos los artículos");
    // console.log(await articulo.deleteAll());
    console.log(await articulo.nombreProd())
    console.log(await articulo.randomProd());
}
main();
module.exports = Desafio2Articulos;


