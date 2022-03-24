const express = require('express');
const PersonService = require('../services/personBill.service')
const personBillSchema = require('../models/personBillModel.model');
const router_person = express.Router();
const service = new PersonService();

/* /* POST: hhtp://localhost:5000/api/v1/people/person 
router_person.post('/person', (req, res) => {
  const personBill = personBillSchema(req.body)
  personBill.save()
      .then((data) => res.json(data))
      .catch((error) => res.json({message: error}))
});

/* GET: hhtp://localhost:5000/api/v1/people/
router_person.get('/', (req, res) => {
  personBillSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({message:error}))
});

/* GET{:id}: hhtp://localhost:5000/api/v1/people/personId
router_person.get('/:personId', (req, res) => {
  const { personId } = req.params;
  personBillSchema
        .findById(personId)
        .then((data) => res.json(data))
        .catch((error) => res.json({message:error}))
});

/* PUT{:id}: hhtp://localhost:5000/api/v1/people/personId
router_person.put('/:personId', (req, res) => {
  const { personId } = req.params;
  const{name, lastname, dni, address} = req.body
  personBillSchema
      .updateOne({ _id: personId }, {$set:{name, lastname, dni, address}})
      .then((data) => res.json(data))
      .catch((error) => res.json({message:error}))
});

/* DELETE{:id}: hhtp://localhost:5000/api/v1/people/personId
router_person.delete('/:personId', (req, res) => {
  const { personId } = req.params;
  personBillSchema
        .remove({ _id: personId})
        .then((data) => res.json(data))
        .catch((error) => res.json({message:error}))
});

module.exports = router_person
 */










router_person.post('/personBill', async (req, res) => {
  const personBill = personBillSchema(req.body);
  await service
    .createPersonBill(personBill)
    .then((data) => res.status(201).json(data))
    .catch((err) => res.status(404).json({ message: err }));
});

router_person.get('/', async (req, res) => {
  await service
    .listPersonBill()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(404).json({ message: err }));
});

router_person.get('/:personId', async (req, res) => {
  const { personId } = req.params;
  await service
    .showPersonBill(personId)
    .then((data) => res.status(302).json(data))
    .catch((err) => res.status(404).json({ message: err }));
});

router_person.put('/:personId', async (req, res) => {
  const { personId } = req.params;
  const { name, lastname, dni, address } = req.body;
  await service
    .editPersonBill(personId, name, lastname, dni, address)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(304).json({ message: err }));
});

router_person.delete( '/:personId' , async (req, res) => {
  const { personId } = req.params;
  await service
    .removePersonBill(personId)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(404).json({message: err}));
} );


module.exports = router_person;
