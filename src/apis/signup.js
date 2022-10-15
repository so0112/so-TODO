import { instance } from './api';

/** 회원가입 POST API
 * postSignup(회원가입 URL, 이메일, 비밀번호)
 */

export const postSignup = async (SIGNUP_URL, email, password, setErrors) => {
  await instance
    .post(SIGNUP_URL, {
      email,
      password,
    })
    .then(res => window.location.replace('/'))
    .catch(error => {
      setErrors(true);
    });
};
