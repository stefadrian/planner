export default class NameGenerator {
  static generateName(prototype, type) {
    return (
      (type === null || type === void 0
        ? void 0
        : type.substr(0, 1).toUpperCase()) +
      (type === null || type === void 0 ? void 0 : type.substr(1))
    );
  }
}
