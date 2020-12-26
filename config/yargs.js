const descripcion = {
    alias: 'd',
    demand: true
}

const completado = {
    alias: 'c',
    default: true
}

const argv = require('yargs')
    .command('crear', 'Crear un elemento por hacer', descripcion)
    .command('actualizar', 'Actualizar el estado completado de una tarea', { descripcion, completado })
    .command('borrar', 'Borrar una tarea de la lista', descripcion)
    .help()
    .argv;

module.exports = {
    argv
}