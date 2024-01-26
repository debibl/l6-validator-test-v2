1)Validator.js:"import StringSchema from './StringSchema.js';
import ArraySchema from './ArraySchema.js';
import ObjectSchema from './ObjectSchema.js';

export default class Validator {
  string() {
    return new StringSchema([(value) => typeof value === 'string']);
  }

  array() {
    return new ArraySchema([(value) => Array.isArray(value)]);
  }

  object() {
    return new ObjectSchema([(value) => typeof value === 'object']);
  }
}
"
2)StringSchema.js:"export default class StringSchema {
  constructor(validators) {
    this.validators = validators;
  }

  isValid(value) {
    return this.validators.every((validator) => validator(value));
  }

  containsNumber() {
    return {
      isValid(value) {
        return /[0-9]/.test(value);
      },
    };
  }
}
"
3)ArraySchema.js:"export default class ArraySchema {
  constructor(validators) {
    this.validators = validators;
  }

  isValid(value) {
    return this.validators.every((validator) => validator(value));
  }

  containsNumber() {
    return {
      isValid(value) {
        if (!Array.isArray(value)) {
          return false;
        }
        return value.every((element) => /[0-9]/.test(element));
      },
    };
  }

  custom(val) {
    const validator = (array) => array.every((el) => val(el));
    return new ArraySchema([...this.validators, validator]);
  }
}
"
4)ObjectSchema:"export default class ObjectSchema {
  constructor(validators) {
    this.validators = [...validators];
  }

  isValid(value) {
    return this.validators.every((validator) => validator(value));
  }

  shape(fields) {
    const validator = (obj) => {
      const keys = Object.keys(fields);
      return keys.every((key) => {
        const fieldValidator = fields[key];
        const fieldValue = obj[key];
        return fieldValidator.isValid(fieldValue);
      });
    };
    return new ObjectSchema([...this.validators, validator]);
  }
}
"