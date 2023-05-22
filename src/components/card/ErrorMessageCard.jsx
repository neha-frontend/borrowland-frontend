const ErrorMessageCard = ({ id, errorMsg }) => {
  return (
    <div
      id={id}
      className={`invalid_error ${
        id === "close_account_error" ? "text-left" : "text-center"
      }`}
    >
      {errorMsg}
    </div>
  );
};

export default ErrorMessageCard;
