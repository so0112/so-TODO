/** 이메일 유효성 체크 함수 */
export function checkEmail(email) {
  let emailReg =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailReg.test(email);
}

/** 비밀번호 유효성 체크 함수 */
export function checkPassword(password) {
  return password.length >= 8;
}

/** 비밀번호 확인 유효성 체크 함수 */
export function cofirmPassword(password, password2) {
  return password === password2;
}
