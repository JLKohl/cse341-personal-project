const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;


const getAllAttractions = async (req, res, next) => {
  try {
    const db = mongodb.getDb().db('disney_planner');
    const result = await db.collection('attractions').find().toArray();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }

};

const getAttractionById = async (req, res) => {
//   try {
//     const db = require('../db/connect').getDb().db('Test');
//     const id = req.params.id; // gets the value from the URL
//     const contact = await db.collection('Contacts').findOne({ _id: new ObjectId(id) });
//     if (!contact) return res.status(404).json({ error: 'Contact not found' });
//     res.status(200).json(contact);
//   } catch (err) {
//     res.status(500).json({ error: 'Something went wrong' });
//   }
};

const newAttraction = async (req, res) => {

  const attactionData = {

    name: req.body.name,
    park: req.body.park,
    waitTime: req.body.waitTime,
    type: req.body.type
  }

  const response = await mongodb.getDb().db().collection('attractions').insertOne(attactionData);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }

}

const editAttraction = async (req, res) => {

//   console.log('EDIT CONTACT HIT');
//   console.log('ID:', req.params.id);
//   console.log('BODY:', req.body);

//   const contactId = req.params.id;
//   const updates = req.body;

//   const response = await mongodb.getDb().db().collection('Contacts').updateOne({ _id: new ObjectId(contactId) },
//   { $set: updates });

//   if (response.modifiedCount > 0) {
//     res.status(204).send();
//   } else {
//     res.status(500).json(response.error || 'Some error occurred while updating the contact.');
//   }
}

const deleteAttraction = async (req, res) => {
  
//   const contactId = req.params.id;

//   const response = await mongodb.getDb().db().collection('Contacts').deleteOne({ _id: new ObjectId(contactId) });

//   if (response.acknowledged) {
//     res.status(200).json(response);
//   } else {
//     res.status(500).json(response.error || 'Some error occurred while creating the contact.');
//   }
}


module.exports = { getAllAttractions, getAttractionById,
    newAttraction, editAttraction, deleteAttraction
 };