import { useSelector } from "react-redux";
import { RenderIf } from "utils";

const ContactUsCard = ({
  title = "",
  address = "",
  contactNumber = "",
  email = "",
  agent = "",
  onClick,
  disable = false,
}) => {
  const { userData } = useSelector((state) => state.user.userDetails);
  const role = userData?.userRole;
  return (
    <div className="footer_contact">
      <p className="footer_title">{title}</p>
      <p className="footer_address grey600 mt-3">
        {address}
        <RenderIf isTrue={contactNumber}>
          <br />
          Call Us : {contactNumber}
          <br />
        </RenderIf>
        <br />
        {email}
      </p>
      {userData?.verification?.kyc && role !== "agent" && (
        <button className="agent-btn btn" onClick={onClick} disabled={disable}>
          {agent}
        </button>
      )}
    </div>
  );
};

export default ContactUsCard;
