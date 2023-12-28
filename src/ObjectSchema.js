export default class ObjectSchema {
  constructor() {
    this.validationSchema = {};
  }

  shape(schema) {
    this.validationSchema = schema;
    return this;
  }

  isValid(data) {
    return this.validateObject(data, this.validationSchema);
  }

  validateObject(data, schema) {
    for (const key of Object.keys(schema)) {
      const validator = schema[key];

      if (typeof validator === 'object' && validator !== null) {
        // Nested object
        if (!this.validateObject(data[key], validator)) {
          return false;
        }
      } else {
        // Leaf validator
        if (!validator.validate(data[key])) {
          return false;
        }
      }
    }

    return true;
  }
}
