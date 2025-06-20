import { Module } from '@nestjs/common';
import { CreatorSocialService } from './creator-social.service';
import { CreatorSocialController } from './creator-social.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CreatorSocial } from './model/creator-social.model';
import { Admin } from '../admin/model/admin.model';
import { AdminModule } from '../admin/admin.module';
import { Social } from '../social/model/social.model';
import { SocialModule } from '../social/social.module';

@Module({
  imports: [SequelizeModule.forFeature([CreatorSocial, Admin, Social]), AdminModule, SocialModule],
  controllers: [CreatorSocialController],
  providers: [CreatorSocialService],
  exports: [CreatorSocialService],
})
export class CreatorSocialModule {}
