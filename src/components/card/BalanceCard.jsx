import { QUESTION } from "../../assets/images";

const BalanceCard = ({
  title = "",
  balanceValue = "0",
  title2 = "",
  balanceValue2 = "",
  mainClassName = "",
  balanceValueClassName = "",
}) => {
  return (
    <div className="card_box_prizing">
      <div className={mainClassName + " position-relative"}>
        <div className="p-3 d-flex justify-content-between pos">
          <div className="">
            <p className="balance_card_title">{title}</p>
            <p className={`balance_card_value mt-2 ${balanceValueClassName}`}>
              ${parseFloat(balanceValue).toFixed(2)}
            </p>
          </div>
          {!title2 && !balanceValue2 && (
            <div
              data-tooltip="I am tooltip"
              className="mr-2 cursor_pointer question_position"
            >
              <img src={QUESTION} alt="info" />
            </div>
          )}
        </div>

        {title2 && balanceValue2 && (
          <div className="ml-3 w-100">
            <div className="p-3 w-98">
              <p className="balance_card_title">{title2}</p>
              <p className={`balance_card_value mt-2 ${balanceValueClassName}`}>
                ${parseFloat(balanceValue2).toFixed(2)}
              </p>
            </div>
            <div
              data-tooltip="I am tooltip"
              className="mr-2 cursor_pointer question_position"
            >
              <img src={QUESTION} alt="infos" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BalanceCard;
