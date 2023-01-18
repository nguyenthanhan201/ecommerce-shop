import { getUserByEmailAPI } from "api/authServices";
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
      return getUserByEmailAPI(
        user.displayName || "",
        user.email || ""
      ).then((res) => {
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
