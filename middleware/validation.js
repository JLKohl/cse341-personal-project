//calling express validator
const { body, validationResult } = require('express-validator');

//validation for attractions

const validateAttraction = [

  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string'),

  body('park')
    .trim()
    .notEmpty()
    .withMessage('Park is required')
    .isString()
    .withMessage('Park must be a string'),

  body('waitTime')
    .notEmpty()
    .withMessage('Wait time is required')
    .isNumeric()
    .withMessage('Wait time must be a number'),

  body('rideType')
    .trim()
    .notEmpty()
    .withMessage('Type is required')
    .isString()
    .withMessage('Type must be a string')
]

//tip validation rules
const validateTrips = [

    body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required'),

  body('startDate')
    .notEmpty()
    .withMessage('Start date is required')
    .isDate({ format: 'MM/DD/YYYY' })
    .withMessage('Start date must be in MM/DD/YYYY format'),

  body('endDate')
    .notEmpty()
    .withMessage('End date is required')
    .isDate({ format: 'MM/DD/YYYY' })
    .withMessage('End date must be in MM/DD/YYYY format')
    .custom((value, { req }) => {
      const start = new Date(req.body.startDate);
      const end = new Date(value);
      if (end < start) throw new Error('End date must be after start date');
      return true;
    }),

  body('parkList')
    .isArray({ min: 1 })
    .withMessage('Park list must be an array of strings')
    .custom((list) => {
      if (list.some(p => typeof p !== 'string')) throw new Error('Park list can only contain strings');
      return true;
    }),

  body('hotel')
    .optional()
    .isString()
    .withMessage('Hotel must be a string'),

  body('budget')
    .optional()
    .isNumeric()
    .withMessage('Budget must be a number'),

  body('notes')
    .optional()
    .isString()
    .withMessage('Notes must be a string')
]

const handleValidationErrors = (res, req, next) => {
    const errors = validateResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    next();
}

module.exports ={validateAttraction, validateTrips, handleValidationErrors}