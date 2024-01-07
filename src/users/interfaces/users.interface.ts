/*
 * @Author: DESKTOP-HCPCFRE\X 752940841@qq.com
 * @Date: 2023-11-28 00:23:22
 * @LastEditors: DESKTOP-HCPCFRE\X 752940841@qq.com
 * @LastEditTime: 2024-01-07 19:24:03
 * @FilePath: \彩票API\src\users\interfaces\users.interface.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
import { Document } from 'mongoose';

export interface UsersInterface extends Document {
  name: string;
  password: string;
  token: string;
  avatar: string;
  state: string;
  shop_id: string;
  shop_name?: string;
  audit?: number;
}
