export class ValidationUtil {
  static require(value: string | number): boolean {
    const target = String(value);
    return target.length > 0;
  }

  static max(value: string, maxLength: number): boolean {
    if (value.length === 0) {
      return true;
    }
    return value.length <= maxLength;
  }

  static requireMax(value: string | number, maxLength: number): boolean {
    const target = String(value);
    return (
      ValidationUtil.require(target) && ValidationUtil.max(target, maxLength)
    );
  }

  static min(value: string, minLength: number): boolean {
    if (value.length === 0) {
      return true;
    }
    return value.length >= minLength;
  }

  static requireMin(value: string | number, minLength: number): boolean {
    const target = String(value);
    return (
      ValidationUtil.require(target) && ValidationUtil.min(target, minLength)
    );
  }

  static email(value: string): boolean {
    return !!value.match(
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
  }

  static password(value: string): boolean {
    return !!value.match(/^[a-z\d-_]{6,}$/i);
  }
}
