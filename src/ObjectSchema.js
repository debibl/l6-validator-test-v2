export default class ObjectSchema {
  shape(schema) {
    return {
      isValid(value) {
        if (typeof value !== 'object'   ||Array.isArray(value)  value === null) {
          return false;
        }
        return Object.entries(schema).every(([key, validator]) => {
          const propertyValue = value[key];
          return validator && validator.isValid(propertyValue);
        });
      },
    };
  }
}