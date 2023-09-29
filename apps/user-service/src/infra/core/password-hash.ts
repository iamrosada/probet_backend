import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";

// scrypt is callback based so with promisify we can await it
const scryptAsync = promisify(scrypt);

export class Password {
  static async hashPassword(password: string) {
    // Generate a stronger random salt (32 bytes)
    const salt = randomBytes(32).toString('hex');

    try {
      const buf = await scryptAsync(password, salt, 64) as Buffer;
      return `${buf.toString('hex')}.${salt}`;
    } catch (err) {
      throw new Error('Error hashing password');
    }
  }

  static async comparePassword(
    storedPassword: string,
    suppliedPassword: string
  ): Promise<boolean> {
    const [hashedPassword, salt] = storedPassword.split(".");

    if (!hashedPassword || !salt) {
      return false; // Invalid stored password format
    }

    const hashedPasswordBuf = Buffer.from(hashedPassword, "hex");
    const suppliedPasswordBuf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    if (!hashedPasswordBuf || !suppliedPasswordBuf) {
      return false; // Error hashing one of the passwords
    }

    try {
      // Compare the new supplied password with the stored hashed password
      return timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf);
    } catch (err) {
      console.error('Error comparing passwords:', err);
      return false; // Error comparing passwords
    }
  }






}