const express = require('express');
const SuperheroService = require('../services/superhero_v2.service')
const superheroModel = require('../models/superhero_v2.model');
const superheroV2Router = express.Router();
const service = new SuperheroService();



/* //////////////////////////////////////////////// */
/*201: Created
  200: Listas
  302: Found
  304: Not modified
  404: Not found */

  superheroV2Router.post('/superhero_v2', async (req, res) => {
    try {
      const superheroV2 = superheroModel(req.body);
      const data = await service.createSuperhero(superheroV2);
      res.status(201).json(data);
    } catch (error) {
      res.status(404).json({ message: err });
    }

  });

  superheroV2Router.get('/', async (req, res) => {
    try {
      const data = await service.listSuperhero();
      res.status(200).json(data);
    } catch (error) {
      res.status(404).json({ message: err });
    }
  });

  superheroV2Router.get('/:superheroId', async (req, res) => {
    try {
      const { superheroId } = req.params;
      const data = await service.showSuperhero(superheroId);
      res.status(302).json(data);
    } catch (error) {
      res.status(404).json({ message: err });
    }
  });

  superheroV2Router.put('/:superheroId', async (req, res) => {
    try {
      const { superheroId } = req.params;
      const { superhero, realname, superpower } = req.body;
      const data = await service.editSuperhero(superheroId, superhero, realname, superpower);
      res.status(200).json(data);
    } catch (error) {
      res.status(304).json({ message: err });
    }
  });

  superheroV2Router.delete( '/:superheroId' , async (req, res) => {
    try {
      const { superheroId } = req.params;
      const data = await service.removeSuperhero(superheroId);
      res.status(200).json(data);
    } catch (error) {
      res.status(404).json({message: err});
    }
  } );


  module.exports = superheroV2Router;
