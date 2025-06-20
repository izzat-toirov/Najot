import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './model/admin.model';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin)
    private readonly AdminModel: typeof Admin,
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    try {
      return await this.AdminModel.create(createAdminDto);
    } catch (error) {
      console.error(error);
      return 'admin yaratilmadi';
    }
  }

  async findAll() {
    try {
      return await this.AdminModel.findAll();
    } catch (error) {
      console.error(error);
      return 'adminlar topilmadi';
    }
  }

  async findOneADMIN(id: number) {
    try {
      return await this.AdminModel.findByPk(id);
    } catch (error) {
      console.error(error);
      return 'admin topilmadi';
    }
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    try {
      const admin = await this.AdminModel.findByPk(id);
      if (!admin) return `admin topilmadi`;
      return await admin.update(updateAdminDto);
    } catch (error) {
      console.error(error);
      return 'admin topilmadi';
    }
  }

  async remove(id: number) {
    try {
      const admin = await this.AdminModel.findByPk(id);
      if (!admin) return `admin topilmadi`;
      await admin.destroy();
      return { message: 'Deleted successfully' };
    } catch (error) {
      console.error(error);
      return 'admin topilmadi';
    }
  }
}
