const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;


const getAllTrips = async (req, res, next) => {
  try {
    const db = mongodb.getDb().db('disney_planner');
    const result = await db.collection('trips').find().toArray();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }

};

const getTripById = async (req, res) => {
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

const newTrip = async (req, res) => {

  const tripData = {

    name: req.body.name,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    parkList: req.body.parkList, // array of parks
    hotel: req.body.hotel,
    budget: req.body.budget,
    notes: req.body.notes
  }

  const response = await mongodb.getDb().db().collection('disney_planner').insertOne(tripData);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }

}

const editTrip = async (req, res) => {

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

const deleteTrip = async (req, res) => {
  
//   const contactId = req.params.id;

//   const response = await mongodb.getDb().db().collection('Contacts').deleteOne({ _id: new ObjectId(contactId) });

//   if (response.acknowledged) {
//     res.status(200).json(response);
//   } else {
//     res.status(500).json(response.error || 'Some error occurred while creating the contact.');
//   }
}


module.exports = { getAllTrips, getTripById, 
    newTrip, editTrip, deleteTrip
 };