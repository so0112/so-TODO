import axios from "axios";

/** 로그인 POST API
 * handleLogin(URL, 아이디, 비밀번호, dispatch)
 */

const handleLogin = async (LOGIN_URL, email, password) => {
  try {
    const res = await axios.post(
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
    );
    console.log("res : ", res);
    localStorage.setItem("token", res.data["access_token"]);
    window.location.replace("/todo");
  } catch (error) {
    console.log(error);
  }
};

export default handleLogin;
