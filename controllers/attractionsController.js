const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;


const getAllAttractions = async (req, res, next) => {
  try {
    const db = mongodb.getDb().db('disney_planner');
    const response = await db.collection('attractions').find().toArray();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }

};

const getAttractionById = async (req, res) => {
  try {
    const db = require('../db/connect').getDb().db('disney_planner');
    const id = req.params.id; // gets the value from the URL
    const attraction = await db.collection('attractions').findOne({ _id: new ObjectId(id) });
    if (!attraction) return res.status(404).json({ error: 'attraction not found' });
    res.status(200).json(attraction);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const newAttraction = async (req, res) => {
  console.log(req.body);
  
  const attractionData = {

    name: req.body.name,
    park: req.body.park,
    waitTime: req.body.waitTime,
    type: req.body.type
  }

  const response = await mongodb.getDb().db().collection('attractions').insertOne(attractionData);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the attraction.');
  }

}

const editAttraction = async (req, res) => {

  console.log('EDIT attraction HIT');
  console.log('ID:', req.params.id);
  console.log('BODY:', req.body);

  const attractionId = req.params.id;
  const updates = req.body;

  const response = await mongodb.getDb().db().collection('attractions').updateOne({ _id: new ObjectId(attractionId) },
  { $set: updates });

  if (response.matchedCount === 0) {
    res.status(404).json({ message: 'Attraction not found' });
  } else {
    res.status(204).send();
  }

  res.status(200).json(response.value);
}

const deleteAttraction = async (req, res) => {
  
  const attractionId = req.params.id;

  const response = await mongodb.getDb().db().collection('attractions').deleteOne({ _id: new ObjectId(attractionId) });

  if (response.acknowledged) {
    res.status(200).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the attraction.');
  }
}


module.exports = { getAllAttractions, getAttractionById,
    newAttraction, editAttraction, deleteAttraction
 };