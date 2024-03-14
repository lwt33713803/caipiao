import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GroupsSubtotalService } from './groups_subtotal.service';
import { CreateGroupsSubtotalDto } from './dto/create-groups_subtotal.dto';
import { UpdateGroupsSubtotalDto } from './dto/update-groups_subtotal.dto';

@Controller('groups-subtotal')
export class GroupsSubtotalController {
  constructor(private readonly groupsSubtotalService: GroupsSubtotalService) {}

  @Post()
  create(@Body() createGroupsSubtotalDto: CreateGroupsSubtotalDto) {
    return this.groupsSubtotalService.create(createGroupsSubtotalDto);
  }

  @Get()
  findAll() {
    return this.groupsSubtotalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupsSubtotalService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGroupsSubtotalDto: UpdateGroupsSubtotalDto,
  ) {
    return this.groupsSubtotalService.update(+id, updateGroupsSubtotalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupsSubtotalService.remove(+id);
  }
}
