import { BTC_ICON_DROPDOWN } from "assets/images";
import { setTokenIcon } from "../../components/reusableFunctions/reusableFuctions";

const WalletBalanceCard = ({ type, balance = 100, balanceInUsd = 100 }) => {
  return (
    <div className="saving_container">
      <p className="saving_wallet_title">Total Balance</p>
      <div className="balance_container d-flex align-items-center">
        <img
          src={setTokenIcon(type) || BTC_ICON_DROPDOWN}
          className="icon"
          alt="asset"
        />
        <div>
          <p className="balance_amount">
            {type} {balance}
          </p>
          <p className="balance_amount">
            <span className="mx-0">${balanceInUsd}</span>
          </p>
        </div>
      </div>
      <div className="d-flex balance_apy_container">
        {/* <p className="apy_percent">Up to 12% APY</p> */}
        <p className="saving_general_title d-flex">
          Both wallets are eligible for receiving daily interest
        </p>
      </div>
    </div>
  );
};

export default WalletBalanceCard;
