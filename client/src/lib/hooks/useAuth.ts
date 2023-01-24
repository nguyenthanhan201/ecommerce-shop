import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authentication } from "../../config/firebase.config";
import { setAuthSlice } from "../redux/slices/auth";
import { AuthServices } from "../repo/auth.repo";

function useAuth() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authentication, (user) => {
      // console.log("👌 ~ user", user);
      if (!user) return dispatch(setAuthSlice(undefined));
      return AuthServices.getUserByEmail(user.displayName || "", user.email || "").then((res) => {
        const { name, email, _id } = res.data;
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

    return unsubscribe;
  }, [dispatch]);
}

export default useAuth;
