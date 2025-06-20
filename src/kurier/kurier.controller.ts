import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { KurierService } from './kurier.service';
import { CreateKurierDto } from './dto/create-kurier.dto';
import { UpdateKurierDto } from './dto/update-kurier.dto';

@Controller('kurier')
export class KurierController {
  constructor(private readonly kurierService: KurierService) {}

  @Post()
  create(@Body() createKurierDto: CreateKurierDto) {
    return this.kurierService.create(createKurierDto);
  }

  @Get()
  findAll() {
    return this.kurierService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kurierService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKurierDto: UpdateKurierDto) {
    return this.kurierService.update(+id, updateKurierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kurierService.remove(+id);
  }
}
