import { loginWithGoogleAPI } from "api/authServices";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authentication } from "../../config/firebase.config";
import { setAuthSlice } from "../redux/slices/auth";

function useAuth() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authentication, (user) => {
      // console.log("👌 ~ user", user);
      if (!user) return dispatch(setAuthSlice(undefined));
      return loginWithGoogleAPI(
        user.displayName!,
        user.email!
      ).then((res) => {
        dispatch(
          setAuthSlice({
            name: user.displayName,
            email: user.email,
            _id: res._id,
          })
        );
      }).catch((err) => {
        console.log("🚀 ~ file: useAuth.ts ~ line 41 ~ .then ~ err", err);
      });
    });
    
    return unsubscribe;
  }, [dispatch]);
}

export default useAuth;
