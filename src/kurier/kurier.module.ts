import { Module } from '@nestjs/common';
import { KurierService } from './kurier.service';
import { KurierController } from './kurier.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Kurier } from './model/kurier.model';
import { Social } from '../social/model/social.model';

@Module({
  imports: [SequelizeModule.forFeature([Kurier, Social])],
  controllers: [KurierController],
  providers: [KurierService],
  exports: [KurierService],
})
export class KurierModule {}
