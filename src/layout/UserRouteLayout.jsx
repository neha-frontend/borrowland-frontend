import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { FooterBar, Headerbar } from "../components";
import SetTokenHeader from "../hoc/SetTokenHeader/SetTokenHeader";
import axiosMain from "../http/axios/axios_main";
import { RenderIf } from "../utils";

const UserRouteLayout = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/my-loans") {
      document.body.classList.add("remove_scroll");
    } else {
      document.body.classList.remove("remove_scroll");
    }
  }, [pathname]);

  return (
    <div className="user-container">
      <Headerbar />
      {children}

      <RenderIf isTrue={pathname === "/dashboard"}>
        <FooterBar />
      </RenderIf>
    </div>
  );
};

export default SetTokenHeader(UserRouteLayout, axiosMain);
