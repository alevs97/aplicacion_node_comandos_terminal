//Dependencia de directtorio
const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {

    //Guardar en formato JSON
    let data = JSON.stringify(listadoPorHacer)

    fs.writeFile(`db/data.json`, data, (err) => {
        if (err) throw new Error('Nose pudo grabar', err);
    });
}

//Cargar base de datos
const cargarDB = () => {
    try {
        listadoPorHacer = require("../db/data.json");
    } catch (err) {
        listadoPorHacer = [];
    }
}

const getListado = () => {
    cargarDB();

    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    }

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
}

const borrar = (descripcion) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        //Busca la posicion y el numero de elementos a eliminar
        listadoPorHacer.splice(index, 1);
        guardarDB();
        return true;
    } else {
        return false;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}