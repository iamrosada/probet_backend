import textflow from "textflow.js";

textflow.useKey(""); // 

export class OTPVerifyPhoneNumber {
  static async sendVerificationCode(phone_number: string): Promise<any> {
    const verificationOptions = {
      service_name: 'ProBet',
      seconds: 600,
    }

    const result = await textflow.sendVerificationSMS(phone_number, verificationOptions);
    return result
  }

  static async verifyCode(phone_number: string, code: string): Promise<any> {

    let result = await textflow.verifyCode(phone_number, code);

    return result

  }
}



