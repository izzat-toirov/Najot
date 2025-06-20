import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { Donation } from './model/donation.model';

@Injectable()
export class DonationsService {
  constructor(
    @InjectModel(Donation)
    private readonly donationModel: typeof Donation,
  ) {}

  async create(createDonationDto: CreateDonationDto) {
    try {
      return await this.donationModel.create(createDonationDto);
    } catch (error) {
      console.error(error);
      return 'donation yaratilmadi';
    }
  }

  async findAll() {
    try {
      return await this.donationModel.findAll();
    } catch (error) {
      console.error(error);
      return 'donationlar topilmadi';
    }
  }

  async findOne(id: number) {
    try {
      return await this.donationModel.findByPk(id);
    } catch (error) {
      console.error(error);
      return 'donation topilmadi';
    }
  }

  async update(id: number, updateDonationDto: UpdateDonationDto) {
    try {
      const donation = await this.donationModel.findByPk(id);
      if (!donation) return `donation topilmadi`;
      return await donation.update(updateDonationDto);
    } catch (error) {
      console.error(error);
      return 'donation topilmadi';
    }
  }

  async remove(id: number) {
    try {
      const donation = await this.donationModel.findByPk(id);
      if (!donation) return `donation topilmadi`;
      await donation.destroy();
      return { message: 'Deleted successfully' };
    } catch (error) {
      console.error(error);
      return 'donation topilmadi';
    }
  }
}
