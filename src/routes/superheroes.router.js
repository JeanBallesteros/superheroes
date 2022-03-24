const express = require('express');
const SuperheroService = require('../services/superhero.service')
const superheroSchema = require('../models/superheroModel.model');
const superhero_routes = express.Router();
const service = new SuperheroService();

/* /* POST: http://localhost:5000/api/v1/superheroes/superhero
superhero_routes.post('/superhero', (req, res) => {
  const superhero = superheroSchema(req.body)
  superhero.save()
      .then((data) => res.json(data))
      .catch((error) => res.json({message: error}))


});

/* GET http://localhost:5000/api/v1/superheroes/
superhero_routes.get('/', (req, res) => {
  superheroSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({message:error}))
});

/* GET{:id}: hhtp://localhost:5000/api/v1/superheroes/superheroId
superhero_routes.get('/:superheroId', (req, res) => {
  const { superheroId } = req.params;
  superheroSchema
        .findById(superheroId)
        .then((data) => res.json(data))
        .catch((error) => res.json({message:error}))
});

/* PUT{:id}: hhtp://localhost:5000/api/v1/superheroes/superheroId
superhero_routes.put('/:superheroId', (req, res) => {
  const { superheroId } = req.params;
  const{superhero, real_name, features, superhero_sidekick} = req.body
  superheroSchema
      .updateOne({ _id: superheroId }, {$set:{superhero, real_name, features, superhero_sidekick}})
      .then((data) => res.json(data))
      .catch((error) => res.json({message:error}))
});

/* DELETE{:id}: hhtp://localhost:5000/api/v1/superheroes/superheroId
superhero_routes.delete('/:superheroId', (req, res) => {
  const { superheroId } = req.params;
  superheroSchema
        .remove({ _id: superheroId})
        .then((data) => res.json(data))
        .catch((error) => res.json({message:error}))
});

module.exports = superhero_routes
 */



/* //////////////////////////////////////////////// */
/*201: Created
  200: Listas
  302: Found
  304: Not modified
  404: Not found */

superhero_routes.post('/superhero', async (req, res) => {
  const superhero = superheroSchema(req.body);
  await service
    .createSuperhero(superhero)
    .then((data) => res.status(201).json(data))
    .catch((err) => res.status(404).json({ message: err }));
});

superhero_routes.get('/', async (req, res) => {
  await service
    .listSuperhero()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(404).json({ message: err }));
});

superhero_routes.get('/:superheroId', async (req, res) => {
  const { superheroId } = req.params;
  await service
    .showSuperhero(superheroId)
    .then((data) => res.status(302).json(data))
    .catch((err) => res.status(404).json({ message: err }));
});

superhero_routes.put('/:superheroId', async (req, res) => {
  const { superheroId } = req.params;
  const { superhero, real_name, features, superhero_sidekick } = req.body;
  await service
    .editSuperhero(superheroId, superhero, real_name, features, superhero_sidekick)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(304).json({ message: err }));
});

superhero_routes.delete( '/:superheroId' , async (req, res) => {
  const { superheroId } = req.params;
  await service
    .removeSuperhero(superheroId)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(404).json({message: err}));
} );


module.exports = superhero_routes;
