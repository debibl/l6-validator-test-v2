export default class StringSchema {
  validators = [(value) => typeof value === 'string'];

  isValid(value) {
    return this.validators.every((validator) => validator(value));
  }

  hasSpaces() {
    const validator = (value) => value.includes(' ');
    this.validators.push(validator);
    return this;
  }
}
