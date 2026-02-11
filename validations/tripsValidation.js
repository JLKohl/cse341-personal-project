function isValidDate(dateString) {
    const regex = /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    if (!regex.test(dateString)) return false;
  
    const [month, day, year] = dateString.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day;

  }

function validateTrip (trip){

    const errors = [];
    const partial = options.partial || false;

    //Required if not partial 

    // Name
    if ((!partial && (!trip.name || typeof trip.name !== 'string' || trip.name.trim() === '')) ||
        (partial && trip.name !== undefined && (typeof trip.name !== 'string' || trip.name.trim() === ''))) {
    errors.push('Name must be a non-empty string');
    }

    // Start Date
    if ((!partial && (!trip.startDate || !isValidDate(trip.startDate))) ||
        (partial && trip.startDate !== undefined && !isValidDate(trip.startDate))) {
    errors.push('Start date must be in MM/DD/YYYY format');
    }

    // End Date
    if ((!partial && (!trip.endDate || !isValidDate(trip.endDate))) ||
        (partial && trip.endDate !== undefined && !isValidDate(trip.endDate))) {
    errors.push('End date must be in MM/DD/YYYY format');
    }

    // Park List
    if ((!partial && (!trip.parkList || !Array.isArray(trip.parkList) || trip.parkList.some(p => typeof p !== 'string'))) ||
        (partial && trip.parkList !== undefined && (!Array.isArray(trip.parkList) || trip.parkList.some(p => typeof p !== 'string')))) {
    errors.push('Park list must be an array of strings');
    }

    //not required
    if (trip.hotel !== undefined && typeof trip.hotel !== 'string') {
        errors.push('Hotel must be a string if provided');
        }    

    if(trip.budget !== undefined && typeof trip.budget !== 'number') {
        errors.push('Budget must be a number if provided')
    }

    if(trip.notes !== undefined && typeof trip.notes !== 'string') {
        errors.push('Notes must be a string if provided')
    }

    return errors;

}

module.exports = {validateTrip};