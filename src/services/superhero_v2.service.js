/* const SuperheroRoute = require('../routes/superhero_v2.router'); */
const SuperheroModel = require('../models/superhero_v2.model')
const Boom = require('@hapi/boom');

class SuperheroService{
  /* Promesas y funciones asincrónicas
  Una función asincrónica devuelve una promesa
  JS es un lenguaje ejecuta un hilo -> sólo hace una cosa a la vez */
  async createSuperhero(superheroV2){
    superheroV2.save();
    return superheroV2
  }

  async listSuperhero(){
    return SuperheroModel.find();
  }

  find(){
    return new Promise((resolve)=>{
      setTimeout(() => {
        resolve(SuperheroModel.find());
      }, 3000);
    });
  }

  async showSuperhero(superheroId){
    return SuperheroModel.findById({ _id: superheroId}).then(
      (superheroFind) => {
        if (!superheroFind) {
          throw Boom.notFound('No se encontró el superhéroe');
        }
        return superheroFind;
      }
    );
  }

  async editSuperhero(superheroId, superhero, realname, superpower){
    return SuperheroModel.findById({ _id: superheroId }).then(
      (superheroFind) => {
        if (!superheroFind) throw Boom.notFound('No se encontró el superhéroe');
        return SuperheroModel.updateOne(
          { superheroId },
          { superhero, realname, superpower}
        );
      }
    );
    /* return SuperheroModel.updateOne(
      { _id: superheroId },
      { superhero, realname, superpower}
    ); */


  }

  async removeSuperhero(superheroId){
    return SuperheroModel.findById({ _id: superheroId }).then(
      (superheroFind) => {
        if (!superheroFind) throw Boom.notFound('No se encontró el superhéroe');
        return SuperheroModel.deleteOne();
      }
    );

  }
}

module.exports = SuperheroService;