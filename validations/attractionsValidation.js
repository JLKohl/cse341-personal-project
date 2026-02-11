
function validateAttraction(attraction, options = {}) {
    const errors = [];
    const partial = options.partial || false;
  
    // Required
    // Name
    if ((!partial && (!attraction.name || typeof attraction.name !== 'string' || attraction.name.trim() === '')) ||
        (partial && attraction.name !== undefined && (typeof attraction.name !== 'string' || attraction.name.trim() === ''))) {
      errors.push('Name is required and must be a non-empty string');
    }
  
    // Park
    if ((!partial && (!attraction.park || typeof attraction.park !== 'string' || attraction.park.trim() === '')) ||
        (partial && attraction.park !== undefined && (typeof attraction.park !== 'string' || attraction.park.trim() === ''))) {
      errors.push('Park is required and must be a non-empty string');
    }
  
    //Optional

    // Wait Time 
    if (attraction.waitTime !== undefined && typeof attraction.waitTime !== 'number') {
        errors.push('Wait time must be a number if provided');
      }
  
    // Type 
    if (attraction.type !== undefined && (typeof attraction.type !== 'string' || attraction.type.trim() === '')) {
      errors.push('Type must be a non-empty string if provided');
     }

  
    return errors;
}
  
module.exports = { validateAttraction };
  