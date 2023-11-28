import * as md5 from 'md5';
export default (val: string, salt: string) => {
  return md5(md5(val) + md5(salt));
};
