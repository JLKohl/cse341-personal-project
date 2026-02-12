function validateAttraction(attraction) {
  const errors = [];

  if (!attraction.name || typeof attraction.name !== 'string') {
    errors.push('Name is required and must be a string');
  }

  if (!attraction.park || typeof attraction.park !== 'string') {
    errors.push('Park is required and must be a string');
  }

  if (attraction.waitTime === undefined || typeof attraction.waitTime !== 'number') {
    errors.push('Wait time is required and must be a number');
  }

  if (!attraction.type || typeof attraction.type !== 'string') {
    errors.push('Type is required and must be a string');
  }

  return errors;
}

module.exports = {validateAttraction};