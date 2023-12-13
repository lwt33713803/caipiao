export class CreateUserDto {
  name: string;
  state: string;
  shop_id: string;
  password: string;
  shop_name?: string;
  avatar?: string;
  audit?: boolean;
}

export class CreateStaffDto {
  staff_name: string;
  staff_phone: string;
  staff_password: string;
}
