import { loginAPI } from "api/authServices";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import DefaultLayout from "layouts/default-layout/DefaultLayout";
import { useNavigate } from "react-router-dom";
import gif from "../assets/images/gifs/animation.f96cd653adf38d1993e0.gif";
import logo from "../assets/images/Logo-2.png";
import { authentication } from "../config/firebase.config";

function Login() {
  const navigate = useNavigate();

  const googleSignIn = () => {
    const googleAuthProvider = new GoogleAuthProvider();
    signInWithPopup(authentication, googleAuthProvider)
      .then((result) => {
        loginAPI(result.user.email!)
          .then((res) => {
            localStorage.setItem("token", res.accessToken);
            navigate("/");
          })
          .catch((err) => alert(err));
      })
      .catch((err) => {
        alert("Đăng nhập thất bại");
        console.log(err);
      });
  };

  return (
    <DefaultLayout>
      <div className="form-login">
        <img src={gif} alt="gif" loading="lazy" />
        <div className="form-login__left">
          <img src={logo} alt="logo" />
          <button className="btn btn-google" onClick={googleSignIn}>
            <i className="bx bxl-google"></i> <p>Đăng nhập với google</p>
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Login;
