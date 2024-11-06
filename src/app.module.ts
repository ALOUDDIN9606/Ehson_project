import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { UsersModule } from './users/users.module';
import { MyDonationsModule } from './my_donations/my_donations.module';
import { CardsModule } from './cards/cards.module';
import { PaymentWeeklyModule } from './payment_weekly/payment_weekly.module';
import { WalletModule } from './wallet/wallet.module';
import { PaymentHistoryModule } from './payment_history/payment_history.module';
import { OrderDetailsModule } from './order_details/order_details.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AccountNumberModule } from './account_number/account_number.module';
import { FamilyModule } from './family/family.module';
import { OrganizatorModule } from './organizator/organizator.module';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      models: [__dirname + '/**/*.model{.ts,.js}'],
      autoLoadModels: true,
      logging: true,
    }),
    AdminModule,
    AuthModule,
    UsersModule,
    MyDonationsModule,
    CardsModule,
    PaymentWeeklyModule,
    WalletModule,
    PaymentHistoryModule,
    OrderDetailsModule,
    NotificationsModule,
    AccountNumberModule,
    FamilyModule,
    OrganizatorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
