import { PartialType } from '@nestjs/swagger';
import { CreateGroupsSubtotalDto } from './create-groups_subtotal.dto';

export class UpdateGroupsSubtotalDto extends PartialType(CreateGroupsSubtotalDto) {}
