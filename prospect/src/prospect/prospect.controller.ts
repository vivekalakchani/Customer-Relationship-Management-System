import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProspectService } from './prospect.service';
import { CreateProspectDto } from './dto/create-prospect.dto';
import { UpdateProspectDto } from './dto/update-prospect.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('prospect')
@Controller('prospect')
export class ProspectController {
  constructor(private readonly prospectService: ProspectService) {}

  @Post('add-single-prospect')
  create(@Body() createProspectDto: CreateProspectDto) {
    return this.prospectService.create(createProspectDto);
  }

  @Get()
  findAll() {
    return this.prospectService.findAll();
  }

  @Get(':prospectId')
  findOne(@Param('prospectId') prospectId: string) {
    return this.prospectService.findOne(prospectId);
  }

  @Patch('update status')
  update(
    @Param('prospectId') prospectId: string,
    @Body() updateProspectDto: UpdateProspectDto,
  ) {
    return this.prospectService.update(prospectId, updateProspectDto);
  }

  @Delete('Delete prospect')
  remove(@Param('prospectId') prospectId: string) {
    return this.prospectService.remove(prospectId);
  }
}
