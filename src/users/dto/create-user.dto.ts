export class CreateUserDto {
  name: string;
  state: number;
  shop_id: string;
  password: string;
  shop_name?: string;
  avatar?: string;
  audit?: number;
}

export class CreateStaffDto {
  staff_name: string;
  staff_phone: string;
  staff_password: string;
}

export class AdminListDto {
  shop_id: string;
  page_size: number;
  page: number;
  shop_name: string;
}
