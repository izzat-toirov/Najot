import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { KurierModule } from './kurier/kurier.module';
import { SocialModule } from './social/social.module';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './admin/model/admin.model';
import { Kurier } from './kurier/model/kurier.model';
import { Social } from './social/model/social.model';
import { Category } from './categories/model/category.model';
import { DonationsModule } from './donations/donations.module';
import { NotificationsModule } from './notifications/notifications.module';
import { CreatorSocialModule } from './creator-social/creator-social.module';
import { Notification } from './notifications/model/notification.model';
import { CreatorSocial } from './creator-social/model/creator-social.model';
import { Donation } from './donations/model/donation.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASS,
      database: process.env.PG_DB,
      autoLoadModels: true,
      synchronize: true,
      logging: false,
      models: [Admin, Kurier, Social, Category, Notification, CreatorSocial, Donation],
    }),
    AdminModule,
    KurierModule,
    CategoriesModule,
    SocialModule,
    DonationsModule,
    NotificationsModule,
    CreatorSocialModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
