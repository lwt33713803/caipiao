import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClerkService } from './clerk.service';
import { CreateClerkDto } from './dto/create-clerk.dto';
import { UpdateClerkDto } from './dto/update-clerk.dto';
@ApiTags('员工管理')
@Controller('clerk')
export class ClerkController {
  constructor(private readonly clerkService: ClerkService) {}

  @Post('register')
  async create(@Body() createClerkDto: CreateClerkDto) {
    return this.clerkService.create(createClerkDto);
  }

  @Get()
  findAll(@Query('shop_id') shop_id: string) {
    console.log('shop_id', shop_id);
    return this.clerkService.findAll(shop_id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClerkDto: UpdateClerkDto) {
    return this.clerkService.update(+id, updateClerkDto);
  }


  @Get('delete')
  remove(@Query('tel') tel: string) {
    console.log('tel1', tel);
    return this.clerkService.remove(tel);
  }
}
