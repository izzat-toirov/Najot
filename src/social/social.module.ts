import { Module } from '@nestjs/common';
import { SocialService } from './social.service';
import { SocialController } from './social.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Social } from './model/social.model';
import { Category } from '../../dist/categories/model/category.model';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [SequelizeModule.forFeature([Social, Category]), CategoriesModule],
  controllers: [SocialController],
  providers: [SocialService],
  exports: [SocialService],
})
export class SocialModule {}
