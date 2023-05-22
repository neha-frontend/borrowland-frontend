// eslint-disable-next-line no-empty-pattern
const InformationCard = ({
  icon = "",
  title = "",
  text = "",
  // imageClassName = "",
  // titleClassName = "",
  // textClassName = "",
  // borderClassName = "",
}) => {
  return (
    // <div className="d-flex flex-column info_card">
    //   <div className={borderClassName}>
    //     <img src={icon} className={imageClassName} alt="info_icon" />
    //     <div>
    //     <p className={titleClassName}>{title}</p>
    //     </div>
    //     <p className={textClassName}>{text}</p>
    //   </div>
    // </div>
    <div className="loan_wrapper">
      <div className="loan_border">
        <img src={icon} alt="icon" />
        <p className="loan_title">{title}</p>
        <p className="loan_desc">{text}</p>
      </div>
    </div>
  );
};

export default InformationCard;
