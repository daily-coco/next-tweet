//Password
export const PASSWORD_MIN_LENGTH = 5;
export const PASSWORD_SPECIAL_CHARACTER = `#?!@$%^&*-`;
export const PASSWORD_REGEX = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
);
export const PASSWORD_REGEX_ERROR = `비밀번호는 최소 ${PASSWORD_MIN_LENGTH}여야 하며, 대소문자와 특수문자(${PASSWORD_SPECIAL_CHARACTER})를 포함하여야 합니다.`;

//Email
export const EMAIL_ALLOWED_DOMAIN = [
    'naver.com',
    'daum.net',
    'hanmail.net',
    'nate.com',
    'gmail.com',
    'yahoo.co.kr',
];
