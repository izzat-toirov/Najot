import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCreatorSocialDto } from './dto/create-creator-social.dto';
import { UpdateCreatorSocialDto } from './dto/update-creator-social.dto';
import { CreatorSocial } from './model/creator-social.model';
import { AdminService } from '../admin/admin.service';
import { SocialService } from '../social/social.service';

@Injectable()
export class CreatorSocialService {
  constructor(
    @InjectModel(CreatorSocial)
    private readonly creatorSocialModel: typeof CreatorSocial,
    private readonly AdminServis: AdminService,
    private readonly SocialServis: SocialService
  ) {}

  async create(createCreatorSocialDto: CreateCreatorSocialDto) {
    try {
      const admin = await this.AdminServis.findOneADMIN(createCreatorSocialDto.creator_id)
      if (!admin) {
        throw new NotFoundException(`bunday ${admin} id li admin topilmadi`)
      }
      const social = await this.SocialServis.findOneSOCIAL(createCreatorSocialDto.social_id)
      if (!social) {
        throw new NotFoundException(`bunday ${admin} id li social topilmadi`)
      }
      return await this.creatorSocialModel.create(createCreatorSocialDto);
    } catch (error) {
      console.error(error);
      return 'CreatorSocial yaratilmadi';
    }
  }

  async findAll() {
    try {
      return await this.creatorSocialModel.findAll();
    } catch (error) {
      console.error(error);
      return 'CreatorSociallar topilmadi';
    }
  }

  async findOne(id: number) {
    try {
      return await this.creatorSocialModel.findByPk(id);
    } catch (error) {
      console.error(error);
      return 'CreatorSocial topilmadi';
    }
  }

  async update(id: number, updateCreatorSocialDto: UpdateCreatorSocialDto) {
    try {
      const CreatorSocial = await this.creatorSocialModel.findByPk(id);
      if (!CreatorSocial) return `CreatorSocial topilmadi`;
      return await CreatorSocial.update(updateCreatorSocialDto);
    } catch (error) {
      console.error(error);
      return 'CreatorSocial topilmadi';
    }
  }

  async remove(id: number) {
    try {
      const CreatorSocial = await this.creatorSocialModel.findByPk(id);
      if (!CreatorSocial) return `CreatorSocial topilmadi`;
      await CreatorSocial.destroy();
      return { message: 'Deleted successfully' };
    } catch (error) {
      console.error(error);
      return 'CreatorSocial topilmadi';
    }
  }
}
