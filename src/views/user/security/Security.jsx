import { useNavigate } from "react-router-dom";

import { DANGER_ICON_FILLED } from "../../../assets/images";
import {
  IdentityVerificationCard,
  SECURITY_OPTION_ARRAY,
} from "../../../components";

import "./Security.css";

const Security = () => {
  const navigate = useNavigate();
  return (
    <div className="background_color security_background_color">
      <div className="container h100v pt-3 pb-1">
        <div className="border_box p-4 security_box">
          <p className="title mb-1 security_title">Security</p>
          <p className="text">
            Manage your Account Activity, Two-Factor Authentication (2FA) and
            Withdrawal Whitelisting.
          </p>
          <div className="pt-3">
            {SECURITY_OPTION_ARRAY.map((item) => {
              return (
                <IdentityVerificationCard
                  type="PROFILE"
                  key={item?.id}
                  title={item?.title}
                  text={item?.text}
                  imageIcon={item?.image}
                  buttonText={item?.buttonText}
                  handleButtonClick={() => navigate(item?.to)}
                  mainClassName=" pt-4 justify-content-between"
                  titleClassName="title"
                  textClassName="text"
                  buttonClassName="identity_verify_button"
                  securityBtn
                />
              );
            })}
          </div>
        </div>
        <div className="d-flex align-items-baseline">
          <img src={DANGER_ICON_FILLED} alt="danger" className="pr-2" />
          <p className="pt-4 pb-2 disclose_text">
            Do not disclose your password or 2FA code to anyone, including
            borowland support
          </p>
        </div>
      </div>
    </div>
  );
};

export default Security;
