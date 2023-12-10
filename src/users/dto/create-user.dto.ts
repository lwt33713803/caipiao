export class CreateUserDto {
  name: string;
  state: string;
  shop_id: string;
  password: string;
  shop_name?: string;
  avatar?: string;
  audit?: boolean;
}
