export class CreateShopDto {}

export class CreateShopsUser {
  user_id: string;
  user_name: string;
  user_phone: string;
  user_sum: string;
  user_status: number;
  create_time: string;
  update_time: string;
}

export class CreateShopsClerk {
  clerk_id: string;
  clerk_name: string;
  clerk_phone: string;
  clerk_password: string;
}

export class CreateShopsAlipay {
  switch: boolean;
  alipay_id: string;
}

export class Recharge {
  id: string;
  num: number;
}

export const defaultInfo = {
  shop_id: '',
  trust_sum: 0,
  remaining_sum: 0,
  setting: {
    register_flag: true,
    home_poster: true,
    home_order_remind: true,
  },
  user_manage: [],
  clerk_manage: [],
  receipt_manage: {},
};
