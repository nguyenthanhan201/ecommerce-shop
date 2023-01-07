import SiderBar from "components/index/user/components/Sidebar/SiderBar";
import DefaultFooter from "layouts/default-footer/DefaultFooter";
import DefaultHeader from "layouts/default-header/DefaultHeader";
import { useAppDispatch } from "lib/hooks/useAppDispatch";
import { useAppSelector } from "lib/hooks/useAppSelector";
import useAuth from "lib/hooks/useAuth";
import { GET_CART_ITEMS } from "lib/redux/types";
import { useEffect } from "react";
import "./UserLayout.scss";

const UserPlayout = ({ ...props }: any) => {
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
        <div className="main user-layout">
          <SiderBar />
          <div className="context">{props.children}</div>
        </div>
        <DefaultFooter />
      </div>
    </>
  );
};

export default UserPlayout;
