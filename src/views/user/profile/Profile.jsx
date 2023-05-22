import { Nav } from "react-bootstrap";
import { useLocation } from "react-router-dom";

import { HeaderTabCard, PROFILE_TAB_ARRAY } from "../../../components";
import IdentityVerification from "./identityVerification/IdentityVerification";
import Settings from "./settings/Settings";

import "./Profile.css";

const Profile = () => {
  const { pathname } = useLocation();

  return (
    <div>
      <div className="container">
        <Nav
          id="profile_navbar"
          className="m-auto my-2 my-lg-0 navbar_custom"
          style={{ maxHeight: "100px" }}
          navbarScroll
        >
          {PROFILE_TAB_ARRAY.map((item) => {
            return (
              <HeaderTabCard
                key={item?.key}
                linkTo={item?.to}
                linkName={item?.name}
                isActive={pathname === item?.to}
              />
            );
          })}
        </Nav>
      </div>
      <div className="background_color">
        <div className="container  py-sm-5 py-3">
          {pathname === "/profile/identity-verification" ? (
            <IdentityVerification />
          ) : (
            <Settings />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
