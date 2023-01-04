import { useAppDispatch } from "lib/hooks/useAppDispatch";
import { useAppSelector } from "lib/hooks/useAppSelector";
import useAuth from "lib/hooks/useAuth";
import { GET_CART_ITEMS } from "lib/redux/types";
import { useEffect } from "react";
import DefaultFooter from "../default-footer/DefaultFooter";
import DefaultHeader from "../default-header/DefaultHeader";

const DefaultLayout = ({ ...props }: any) => {
  useAuth();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth.auth);

  useEffect(() => {
    if (!auth) return;
    dispatch({ type: GET_CART_ITEMS, payload: auth._id });
  }, [auth, dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      let progress: any = document.querySelector("#progressbar");

      let totalHeight = document.body.scrollHeight - window.innerHeight;
      let progressHeight = (window.pageYOffset / totalHeight) * 100;
      progress.style.height = progressHeight + "%";
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div id="progressbar"></div>
      <div id="scrollPath"></div>
      <DefaultHeader />
      <div className="container">
        <div className="main">
          {props.children}
          <DefaultFooter />
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
