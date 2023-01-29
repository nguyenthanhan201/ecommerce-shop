import { AuthServices } from "@/lib/repo/auth.repo";
import { useRouter } from "next/router";
import { authentication } from "../../../config/firebase.config";

const LoginPage = () => {
  const router = useRouter();

  const googleSignIn = async () => {
    const { signInWithPopup, GoogleAuthProvider } = await import(
      "firebase/auth"
    );

    await signInWithPopup(authentication, new GoogleAuthProvider())
      .then((result) => {
        AuthServices.login(result.user.email!)
          .then((res) => {
            localStorage.setItem("token", res.accessToken);
            router.replace("/");
          })
          .catch((err) => {
            console.log(err);
            alert(err);
          });
      })
      .catch((err) => {
        alert("Đăng nhập thất bại");
        console.log(err);
      });
  };
  return (
    <div className="form-login">
      <img
        src="/images/gifs/ezgif.com-gif-maker.webp"
        alt="yolo-gif"
        loading="lazy"
      />
      <div className="form-login__left">
        <img src="/images/Logo-2.png" alt="logo" />
        <button className="btn btn-google" onClick={googleSignIn}>
          <i className="bx bxl-google"></i> <p>Đăng nhập với google</p>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
