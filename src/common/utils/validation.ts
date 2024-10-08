export class ValidationUtil {
  // static: no need to make an instance to use
  static require(value: string): boolean {
    return value.length > 0;
  }

  static max(value: string, maxLength: number): boolean {
    return value.length <= maxLength;
  }

  static min(value: string, minLength: number): boolean {
    return value.length >= minLength;
  }
}
