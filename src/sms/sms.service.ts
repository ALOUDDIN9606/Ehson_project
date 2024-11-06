import { Injectable } from "@nestjs/common";
const FormData = require("form-data");
import axios from "axios";

@Injectable()
export class SmsService {
  async sendSMS(phone_number: string, otp: string) {
    const data = new FormData();
    data.append("mobile_phone", phone_number);
    data.append("message", "Bu Eskiz dan test");
    data.append("from", "4546");

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: process.env.SMS_SERVICE_URL,
      headers: {
        Authorization: `Bearer ${process.env.SMS_TOKEN}`,
      },
      data: data,
    };
    try {
      const response = await axios(config)
      return response;
    } catch (error) {
      console.log(error);
      return { status: 500 };
    }
  }

  async refreshToken() {
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: process.env.REFRESH_TOKEN_URL, 
      headers: {
        Authorization: `Bearer ${process.env.REFRESH_TOKEN}`, 
        'Content-Type': 'application/json'
      },
      data: {
        grant_type: "refresh_token",
        refresh_token: process.env.REFRESH_TOKEN, 
      },
    };
  
    try {
      const response = await axios(config);

      return response.data;
    } catch (error) {
      console.error("Token yangilashda xatolik:", error);
    }
  }
  
}


