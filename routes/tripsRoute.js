const express = require('express');
const {validateTrips, handleValidationErrors} = require('../middleware/validation')
const tripsController = require('../controllers/tripsController');
const { ensureAuthenticated } = require('../middleware/authMiddleware');
const router = express.Router();

//get route
router.get('/',
    ensureAuthenticated,
    tripsController.getAllTrips);
router.get('/:id', tripsController.getTripById);

//add trip
router.post('/',
    validateTrips,
    handleValidationErrors,
    tripsController.newTrip);

//edit trip
router.put('/:id',
    validateTrips,
    handleValidationErrors,
    tripsController.editTrip);

//delete trip
router.delete('/:id', tripsController.deleteTrip);

module.exports = router;