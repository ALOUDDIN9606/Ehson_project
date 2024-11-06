import { MailerService } from "@nestjs-modules/mailer";
import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException, Param, Req, Res } from "@nestjs/common";
import { User } from "../users/models/user.model";
import { first } from "rxjs";

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(user: User, OTP:string) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Rent House appga xush kelibsiz',
      template: './confirm',
      context: {
        first_name: user.first_name,
        OTP,
      },
    });
  }
}

