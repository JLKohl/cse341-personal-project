// tripsValidation.js

function isValidDate(dateString) {
    // MM/DD/YYYY format
    const regex = /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    if (!regex.test(dateString)) return false;
  
    const [month, day, year] = dateString.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year &&
           date.getMonth() === month - 1 &&
           date.getDate() === day;
  }
  
  function validateTrip(trip) {
    const errors = [];
  
    // Required fields
    if (!trip.name || typeof trip.name !== 'string' || trip.name.trim() === '') {
      errors.push('Name is required and must be a non-empty string');
    }
  
    if (!trip.startDate || !isValidDate(trip.startDate)) {
      errors.push('Start date is required and must be in MM/DD/YYYY format');
    }
  
    if (!trip.endDate || !isValidDate(trip.endDate)) {
      errors.push('End date is required and must be in MM/DD/YYYY format');
    }
  
    if (!trip.parkList || !Array.isArray(trip.parkList) || trip.parkList.some(p => typeof p !== 'string')) {
      errors.push('Park list is required and must be an array of strings');
    }
  
    // Optional fields
    if (trip.hotel !== undefined && typeof trip.hotel !== 'string') {
      errors.push('Hotel must be a string if provided');
    }
  
    if (trip.budget !== undefined && typeof trip.budget !== 'number') {
      errors.push('Budget must be a number if provided');
    }
  
    if (trip.notes !== undefined && typeof trip.notes !== 'string') {
      errors.push('Notes must be a string if provided');
    }
  
    return errors;
  }
  
  module.exports = { validateTrip };
  