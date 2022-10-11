import axios from "axios";

/** 회원가입 POST API
 * postSignup(회원가입 URL, 이메일, 비밀번호)
 */

const handleSignup = async (SIGNUP_URL, email, password, setErrors) => {
  try {
    const res = await axios.post(
      SIGNUP_URL,
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
    window.location.replace("/");
  } catch (error) {
    console.log("error", error);
    setErrors(error);
  }
};

export default handleSignup;
