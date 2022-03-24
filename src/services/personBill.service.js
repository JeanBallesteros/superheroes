/* const personBillRoute = require('../routes/personBill_v2.router'); */
const PersonBillModel = require('../models/personBillModel.model')

class PersonService{
  /* Promesas y funciones asincrónicas
  Una función asincrónica devuelve una promesa
  JS es un lenguaje ejecuta un hilo -> sólo hace una cosa a la vez */
  async createPersonBill(personBill){
    personBill.save();
    return personBill
  }

  async listPersonBill(){
    return PersonBillModel.find();
  }

  async showPersonBill(personId){
    return PersonBillModel.findById({ _id: personId});
  }

  async editPersonBill(personId, name, lastname, dni, address){
    /* return PersonBillModel.findById({ _id: personId }).then(
      (personBillFind) => {
        if (!personBillFind) throw Error('No se encontró el personBille');
        return PersonBillModel.updateOne(
          { personId },
          { personBill, realname, superpower}
        );
      }
    ); */
    return PersonBillModel.updateOne(
      { _id: personId },
      { name, lastname, dni, address}
    );
  }

  async removePersonBill(personId){
    const personBill_remove = PersonBillModel.findById({ _id: personId });
    return PersonBillModel.deleteOne(personBill_remove);

  }
}

module.exports = PersonService;