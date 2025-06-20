import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from './model/notification.model';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification)
    private readonly notificationModel: typeof Notification,
  ) {}

  async create(createNotificationDto: CreateNotificationDto) {
    try {
      return await this.notificationModel.create(createNotificationDto);
    } catch (error) {
      console.error(error);
      return 'Notification yaratilmadi';
    }
  }

  async findAll() {
    try {
      return await this.notificationModel.findAll();
    } catch (error) {
      console.error(error);
      return 'Notificationlar topilmadi';
    }
  }

  async findOne(id: number) {
    try {
      return await this.notificationModel.findByPk(id);
    } catch (error) {
      console.error(error);
      return 'Notification topilmadi';
    }
  }

  async update(id: number, updateNotificationDto: UpdateNotificationDto) {
    try {
      const Notification = await this.notificationModel.findByPk(id);
      if (!Notification) return `Notification topilmadi`;
      return await Notification.update(updateNotificationDto);
    } catch (error) {
      console.error(error);
      return 'Notification topilmadi';
    }
  }

  async remove(id: number) {
    try {
      const Notification = await this.notificationModel.findByPk(id);
      if (!Notification) return `Notification topilmadi`;
      await Notification.destroy();
      return { message: 'Deleted successfully' };
    } catch (error) {
      console.error(error);
      return 'Notification topilmadi';
    }
  }
}
