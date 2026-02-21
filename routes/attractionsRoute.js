const express = require('express');
const attractionsController = require('../controllers/attractionsController')
const {validateAttraction, handleValidationErrors} = require('../middleware/validation')
const { ensureAuthenticated } = require('../middleware/authMiddleware');
const router = express.Router();


//get routes
router.get('/', 
    ensureAuthenticated,
    attractionsController.getAllAttractions);

router.get('/:id', attractionsController.getAttractionById);

//add new attraction
router.post('/', 
    validateAttraction,
    handleValidationErrors,
    attractionsController.newAttraction);

//edit attraction
router.put('/:id',
    validateAttraction,
    handleValidationErrors,
    attractionsController.editAttraction);

//delete attraction
router.delete('/:id', attractionsController.deleteAttraction);

module.exports = router;