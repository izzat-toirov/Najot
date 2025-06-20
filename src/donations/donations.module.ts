import { Module } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { DonationsController } from './donations.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Donation } from './model/donation.model';
import { Admin } from '../admin/model/admin.model';

@Module({
  imports: [SequelizeModule.forFeature([Donation, Admin])],
  controllers: [DonationsController],
  providers: [DonationsService],
  exports: [DonationsService],
})
export class DonationsModule {}
