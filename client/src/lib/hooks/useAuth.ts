import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authentication } from "../../config/firebase.config";
import { setAuthSlice } from "../redux/slices/auth";
import { AuthServices } from "../repo/auth.repo";

function useAuth() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async function unsubscribe() {
      const { onAuthStateChanged } = await import("firebase/auth");
      onAuthStateChanged(authentication, (user) => {
        // console.log("👌 ~ user", user);
        if (!user) return dispatch(setAuthSlice(undefined));
        return AuthServices.getUserByEmail(user.displayName || "", user.email || "").then((res) => {
          // console.log("👌 ~ res", res)
          const { name, email, _id } = res;
          dispatch(
            setAuthSlice({
              name,
              email,
              _id
            })
          );
        }).catch((err) => {
          console.log("err", err);
        });
      });
    })()
  }, [dispatch]);
}

export default useAuth;
