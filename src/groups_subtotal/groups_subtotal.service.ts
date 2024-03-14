import { Injectable } from '@nestjs/common';
import { CreateGroupsSubtotalDto } from './dto/create-groups_subtotal.dto';
import { UpdateGroupsSubtotalDto } from './dto/update-groups_subtotal.dto';

@Injectable()
export class GroupsSubtotalService {
  create(createGroupsSubtotalDto: CreateGroupsSubtotalDto) {
    return 'This action adds a new groupsSubtotal';
  }

  findAll() {
    return `This action returns all groupsSubtotal`;
  }

  findOne(id: number) {
    return `This action returns a #${id} groupsSubtotal`;
  }

  update(id: number, updateGroupsSubtotalDto: UpdateGroupsSubtotalDto) {
    return `This action updates a #${id} groupsSubtotal`;
  }

  remove(id: number) {
    return `This action removes a #${id} groupsSubtotal`;
  }
}
