const PrimaryButton = ({
  text = "",
  type = "button",
  className = "",
  primaryClassName = "btn btn-primary",
  iconClassName = "",
  icon = "",
  handleClick,
  disabled,
  buttonId = "",
}) => {
  return (
    <button
      id={buttonId}
      type={type}
      className={`${primaryClassName} ${className}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {text}
      {icon && (
        <img alt="icon" src={icon} className={iconClassName + " ml-2"} />
      )}
    </button>
  );
};

export default PrimaryButton;
