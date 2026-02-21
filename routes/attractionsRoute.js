const express = require('express');
const {validateAttraction, handleValidationErrors} = require('../middleware/validation')
const router = express.Router();

//get routes
router.get('/', attractionsController.getAllAttractions);

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