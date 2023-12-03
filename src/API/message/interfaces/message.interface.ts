import { Document } from 'mongoose';

export interface MessageInterfaces extends Document {
  from: string; //发送方
  to: string; //接收方
  title: string; //标题
  contet: string; //内容
  create_at: Date; //创建时间
  type: string; //消息类型
  isRead: string; //阅读状态
}
