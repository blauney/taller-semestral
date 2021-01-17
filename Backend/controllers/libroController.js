'use strict'
var mongoose = require('mongoose');
// AQUI Cargamos el modelo para usarlo posteriormente en la siguiente clase
var Libro = require('../modelos/libro');
const Autor = mongoose.model('Autor')

function guardar(req,res){


    let libro = new Libro()
    libro.codigo = req.body.codigo 
    libro.nombre = req.body.nombre
    libro.autor = req.body.idautor

    libro.save((err, Librostore) => {
      if (err) return res.status(500).send(`Error base de datos> ${err}`)

        res.status(200).send({ LibroRegistrada: Librostore })

    })

}
function listarSimple(req,res){
  Libro.find({}, (err, libroBusqueda) => {
    if (!libroBusqueda) return res.status(404).send({ message: 'Error Libro no existe' })
    res.status(200).send({ libroBusqueda })
})
}

function listarAll(req,res){
    Libro.find()
      .populate({
        path:'autor',
        select:'nombre apellido',
        match :{rut:req.query.rutautor}
      }).exec((err, libroConAutor) => {
        res.status(200).send({ libroConAutor })
      })
  }

  function listarconAutor(req,res){
    Libro.find({autor:req.query.autor})
      .populate('autor')
      .exec((err, libroConAutor) => {
        res.status(200).send({ libroConAutor })
      })
  }

  function listar2(req,res){
    Libro.find()  
      .populate('autor')
      .exec((err, resultado) => {
        res.status(200).send({ resultado })
      })
  }
      
module.exports = {
    guardar,
    listarSimple,
    listarAll,
    listarconAutor,
    listar2
};
