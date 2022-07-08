// 手机号码正则
export const Phone = /^1[3-9]\d{9}$/

// 邮箱正则
export const Email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

// 密码正则(密码为8-18位数字/字符/符号的组合)
export const Password =
  /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[()])+$)(?!^.*[\u4E00-\u9FA5].*$)([^(0-9a-zA-Z)]|[()]|[a-z]|[A-Z]|[0-9]){8,18}$/

// 6位数字验证码正则
export const Code_6 = /^\d{6}$/

// 4位数字验证码正则
export const Code_4 = /^\d{4}$/

// url链接正则
export const Url =
  /(((^https?:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)$/

// 16进颜色值 #333 #8c8c8c
export const ColorRegex = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/

// 只能是中文
export const OnlyCh = /^[\u4e00-\u9fa5]+$/gi

// 只能是英文
export const OnlyEn = /^[a-zA-Z]*$/
