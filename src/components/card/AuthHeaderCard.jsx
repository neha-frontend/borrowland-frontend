import { Link } from "react-router-dom";
import { BACK_ICON_SVG, CLOSE_ICON_SVG } from "../../assets/images";

import "./index.css";

const AuthHeaderCard = ({
  headerName = "",
  logoClassName = "",
  // logoImage,
  page,
  showCloseIcon = false,
  showBackIcon = false,
}) => {
  return (
    <>
      {showBackIcon && (
        <div className="back_link">
          <Link to="/" className="text_grey">
            <img src={BACK_ICON_SVG} alt="back" className="mr-2" /> Back
          </Link>
        </div>
      )}

      {showCloseIcon && (
        <div className="closing_icon">
          {page === "LOGIN" ? (
            <a href="http://borrowland.io/" target="_blank" rel="noreferrer">
              <img alt="close_icon" src={CLOSE_ICON_SVG} />
            </a>
          ) : (
            <Link to="/" className="text_grey">
              <img alt="close_icon" src={CLOSE_ICON_SVG} />
            </Link>
          )}
        </div>
      )}

      <div className={`profile_wrapper ${logoClassName}`}>
        {/* <img src={logoImage} className="auth_logo" alt="logo" /> */}
        <p className="auth_title">{headerName}</p>
      </div>
    </>
  );
};

export default AuthHeaderCard;
