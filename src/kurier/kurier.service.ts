import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateKurierDto } from './dto/create-kurier.dto';
import { UpdateKurierDto } from './dto/update-kurier.dto';
import { Kurier } from './model/kurier.model';

@Injectable()
export class KurierService {
  constructor(
    @InjectModel(Kurier)
    private readonly KurierModel: typeof Kurier,
  ) {}
  async create(createKurierDto: CreateKurierDto) {
    try {
      return await this.KurierModel.create(createKurierDto);
    } catch (error) {
      console.error(error);
      return 'kurier yaratilmadi';
    }
  }

  async findAll() {
    try {
      return await this.KurierModel.findAll();
    } catch (error) {
      console.error(error);
      return 'kurierlar topilmadi';
    }
  }

  async findOne(id: number) {
    try {
      return await this.KurierModel.findByPk(id);
    } catch (error) {
      console.error(error);
      return 'kurier topilmadi';
    }
  }

  async update(id: number, updateKurierDto: UpdateKurierDto) {
    try {
      const kurier = await this.KurierModel.findByPk(id);
      if (!kurier) return `kurier topilmadi`;
      return await kurier.update(updateKurierDto);
    } catch (error) {
      console.error(error);
      return 'kurier topilmadi';
    }
  }

  async remove(id: number) {
    try {
      const kurier = await this.KurierModel.findByPk(id);
      if (!kurier) return `kurier topilmadi`;
      await kurier.destroy();
      return { message: 'Deleted successfully' };
    } catch (error) {
      console.error(error);
      return 'kurier topilmadi';
    }
  }
}
