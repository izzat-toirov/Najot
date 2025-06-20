import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './model/admin.model';
import { CreatorSocial } from '../creator-social/model/creator-social.model';
import { Donation } from '../donations/model/donation.model';

@Module({
  imports: [SequelizeModule.forFeature([Admin, CreatorSocial, Donation, Admin])],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
