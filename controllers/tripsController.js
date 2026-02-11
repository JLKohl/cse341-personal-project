const mongodb = require('../db/connect');
const validate = require('../validations/tripsValidation');
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
  try {
    const db = require('../db/connect').getDb().db('disney_planner');
    const id = req.params.id; // gets the value from the URL
    const trip = await db.collection('trips').findOne({ _id: new ObjectId(id) });
    if (!trip) return res.status(404).json({ error: 'trip not found' });
    res.status(200).json(trip);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const newTrip = async (req, res) => {

  const errors = validate.validateTrip(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }


  const tripData = {

    name: req.body.name,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    parkList: req.body.parkList, // array of parks
    hotel: req.body.hotel,
    budget: req.body.budget, //int
    notes: req.body.notes
  }

  const response = await mongodb.getDb().db().collection('trips').insertOne(tripData);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the trip.');
  }

}

const editTrip = async (req, res) => {

  try {
    console.log('EDIT trip HIT');
    console.log('ID:', req.params.id);
    console.log('BODY:', req.body);

    const tripId = req.params.id;
    const updates = req.body;

    const errors = validate.validateTrip(updates, { partial: true });
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const response = await mongodb.getDb()
      .db()
      .collection('trips')
      .updateOne({ _id: new ObjectId(tripId) }, { $set: updates });

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    // PUT routes for your class want 204
    return res.status(204).send();

  } catch (err) {
    console.error('EDIT TRIP ERROR:', err);  // <-- log actual error
    return res.status(500).json({ error: err.message });
  }
}

const deleteTrip = async (req, res) => {
  
  const tripId = req.params.id;

  const response = await mongodb.getDb().db().collection('trips').deleteOne({ _id: new ObjectId(tripId) });

  if (response.acknowledged) {
    res.status(200).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the trip.');
  }
}


module.exports = { getAllTrips, getTripById, 
    newTrip, editTrip, deleteTrip
 };