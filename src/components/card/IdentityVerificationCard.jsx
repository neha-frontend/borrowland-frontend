import {
  RIGHT_ARROW_SVG,
  RIGHT_DARK_ARROW_SVG,
  VERIFIED_ICON,
} from "../../assets/images";
import { RenderIf } from "../../utils";
import PrimaryButton from "../buttons/primaryButton";

import "./index.css";

const IdentityVerificationCard = ({
  imageIcon = "",
  type = "",
  title = "",
  text = "",
  wrapperClass = "",
  buttonText = "",
  mainClassName = "",
  titleClassName = "",
  textClassName = "",
  buttonClassName = "",
  kycStatusWaiting = false,
  handleButtonClick,
  profileBtn = false,
  securityBtn = false,
  showButton = true,
  handleProfileButtonClick,
}) => {
  return (
    <>
      <RenderIf isTrue={type === "PROFILE"}>
        <div className="info_verification bg-transparent">
          <div className={`${mainClassName}`}>
            <div className="verify_wrapper">
              <div className="d-flex justify-content-between identity_wrapper_responsive">
                <div className="mr-md-4 verify_email_img">
                  <img src={imageIcon} />
                </div>
                <div className="d-flex align-items-center justify-content-between border_bottom_email">
                  <div className="verify_email_title w-100 cursor_default">
                    <p className={titleClassName}>{title}</p>
                    <p className={textClassName + " mt-2"}>{text}</p>
                  </div>
                  <RenderIf isTrue={profileBtn}>
                    <RenderIf isTrue={showButton}>
                      <div className="verify_email_button mr-auto">
                        <PrimaryButton
                          className={buttonClassName}
                          text={buttonText}
                          icon={!kycStatusWaiting && RIGHT_ARROW_SVG}
                          iconClassName="icon_size"
                          type="button"
                          handleClick={handleProfileButtonClick}
                          disabled={kycStatusWaiting}
                        />
                      </div>
                    </RenderIf>
                    <RenderIf isTrue={!showButton}>
                      <div className="verify_email_button mr-auto">
                        <img className="" src={VERIFIED_ICON} alt="Verified" />
                      </div>
                    </RenderIf>
                  </RenderIf>
                  <RenderIf isTrue={securityBtn}>
                    <div className="verify_email_button security_btn">
                      <PrimaryButton
                        className={buttonClassName}
                        text={buttonText}
                        icon={RIGHT_DARK_ARROW_SVG}
                        iconClassName="icon_size h14"
                        type="button"
                        handleClick={handleButtonClick}
                      />
                    </div>
                  </RenderIf>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RenderIf>
      <RenderIf isTrue={type === "DASHBOARD"}>
        <div className={`${wrapperClass} identity_verify_card`}>
          <div className={`${mainClassName} kyc-border`}>
            <div className="d-flex align-items-center justify-content-between p-4 verify_wrapper">
              <div>
                <p className={titleClassName}>{title}</p>
                <p className={textClassName}>{text}</p>
              </div>

              <PrimaryButton
                className={buttonClassName}
                text={buttonText}
                icon={!kycStatusWaiting && RIGHT_ARROW_SVG}
                iconClassName="icon_size"
                type="button"
                handleClick={handleButtonClick}
                disabled={kycStatusWaiting}
              />
            </div>
          </div>
        </div>
      </RenderIf>
    </>
  );
};

export default IdentityVerificationCard;
