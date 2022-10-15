/** 이메일 유효성 체크 함수 */
export function checkEmail(email) {
  let emailReg = /^[a-zA-Z0-9._%+-]+@/g;
  return emailReg.test(email);
}

/** 비밀번호 유효성 체크 함수 */
export function checkPassword(password) {
  return password.length >= 8;
}
