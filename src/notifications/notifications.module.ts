import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Notification } from './model/notification.model';
import { Admin } from '../admin/model/admin.model';

@Module({
  imports: [SequelizeModule.forFeature([Notification, Admin])],
  controllers: [NotificationsController],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
