const OptionCard = ({
  icon = "",
  title = "",
  text = "",
  borderClassName = "",
  redirection = "",
  role = "",
  navigate,
  kyc,
  setAlertModal,
}) => {
  const handleRedirect = () => {
    if (kyc) {
      if (title === "Refer" && role !== "agent") {
        window.open(redirection);
      } else {
        navigate(redirection);
      }
    } else {
      setAlertModal(true);
    }
  };
  return (
    <div className="cards_list_padding">
      <div className="cards_list_card curser-pointer">
        <div
          className={`${borderClassName} d-flex align-items-center`}
          onClick={() => handleRedirect()}
        >
          <img src={icon} alt="logo" className="pr-3" />
          <div>
            <p className="option_card_title mb-1">{title}</p>
            <p className="option_card_text">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionCard;
