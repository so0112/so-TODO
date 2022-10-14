import axios from "axios";

/** 로그인 POST API
 * handleLogin(URL, 아이디, 비밀번호, dispatch)
 */

export const postLogin = async (LOGIN_URL, email, password) => {
  await axios
    .post(
      LOGIN_URL,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      localStorage.setItem("token", res.data["access_token"]);
      window.location.replace("/todo");
    })
    .catch((error) => {
      console.log(error);
    });
};
