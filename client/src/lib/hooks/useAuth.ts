import { useEffect } from "react";
import { authentication } from "../../config/firebase.config";
import { setAuthSlice } from "../redux/slices/auth";
import { AuthServices } from "../repo/auth.repo";
import { useAppDispatch } from "./useAppDispatch";

function useAuth() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async function unsubscribe() {
      const { onAuthStateChanged } = await import("firebase/auth");
      onAuthStateChanged(authentication, (user) => {
        // console.log("👌 ~ user", user);
        if (!user) return dispatch(setAuthSlice(undefined));
        return AuthServices.getUserByEmail(String(user.displayName), String(user.email)).then((res) => {
          // console.log("👌 ~ res", res)
          const { name, email, _id } = res;
          dispatch(
            setAuthSlice({
              name,
              email,
              _id
            })
          );
        }).catch((err: any) => {
          console.log("err", err);
        })

      });
    })()
  }, [dispatch]);
}

export default useAuth;
