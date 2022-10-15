import { instance } from './api';

/** 로그인 POST API
 * handleLogin(URL, 아이디, 비밀번호, dispatch)
 */

// interceptor

export const postLogin = async (LOGIN_URL, email, password, setIsError) => {
  await instance
    .post(LOGIN_URL, {
      email,
      password,
    })
    .then(res => {
      localStorage.setItem('token', res.data.access_token);
      window.location.replace('/todo');
    })
    .catch(error => {
      setIsError(true);
    });
};
