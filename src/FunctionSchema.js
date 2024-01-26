export default class FunctionSchema {
  validators = [(value) => typeof value === 'function'];

  isValid(value) {
    return this.validators.every((validator) => validator(value));
  }
}
