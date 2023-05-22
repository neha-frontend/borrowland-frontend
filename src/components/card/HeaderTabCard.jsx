import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import AlertModal from "components/modal/alertModal/AlertModal";
import { RenderIf } from "utils";

const HeaderTabCard = ({
  key = "",
  linkTo = "",
  linkName = "",
  linkImage = "",
  isActive = false,
}) => {
  const { pathname } = useLocation();

  const { userData } = useSelector((state) => state?.user?.userDetails);
  const { isKYCVerified } = useSelector((state) => state.user.verification);

  const [show, setShow] = useState(false);
  const [kycVerification, setKycVerification] = useState(false);
  const [redirectionTo, setRedirectionTo] = useState("");

  const closeModal = () => {
    setShow(false);
  };
  const handleLinkClick = () => {
    if (linkName === "Dashboard") {
      setShow(false);
    } else if (userData?.verification?.kyc) {
      setShow(false);
    } else if (isKYCVerified) {
      setShow(false);
    } else {
      setShow(true);
    }
  };
  const handleKYCAlert = () => {
    if (userData?.verification?.kyc) {
      setKycVerification(true);
    } else if (isKYCVerified) {
      setKycVerification(true);
    } else {
      setKycVerification(false);
    }
  };

  useEffect(() => {
    if (linkName === "Dashboard") {
      setRedirectionTo(linkTo);
    } else if (pathname === "/dashboard") {
      setRedirectionTo("/dashboard");
    } else {
      setRedirectionTo(pathname);
    }
  }, [linkName, pathname]);

  useEffect(() => {
    handleKYCAlert();
  }, [userData, isKYCVerified]);

  return (
    <>
      <Link
        key={key}
        to={!kycVerification ? redirectionTo : linkTo}
        className={`align-items-center custom_dashboard_tabs ${
          isActive ? "active_tab" : "inactive_tab "
        }${linkName == "Help" ? "help" : ""}`}
        onClick={handleLinkClick}
      >
        {linkImage && <img src={linkImage} alt="dashboard_icon" />}
        <p>{linkName}</p>
      </Link>
      <RenderIf isTrue={show}>
        <AlertModal showModal={show} closeModal={closeModal} />
      </RenderIf>
    </>
  );
};

export default HeaderTabCard;
