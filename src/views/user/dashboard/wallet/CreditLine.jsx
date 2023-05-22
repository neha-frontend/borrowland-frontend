import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import {
  setTokenIcon,
  walletTotalBalance,
} from "components/reusableFunctions/reusableFuctions";
import {
  SavingWalletCard,
  Spinner,
  TermsAndCollateralCard,
  WalletBalanceCard,
  WithdrawFundsModal,
} from "../../../../components";
import { resetAssets, getAssetsAction } from "store/sagaActions";
import { RenderIf } from "utils";

const CreditLine = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { assetsList, isLoading: assetsListLoading } = useSelector(
    (state) => state.user.assets
  );

  const [pathNameWallet, setPathNameWallet] = useState("");
  const [showWithdrawFundsModal, setShowWithdrawFundsModal] = useState(false);
  const [creditLineData, setCreditLineData] = useState("");

  const [walletDetails, setWalletDetails] = useState("");
  const handleOpenWithdrawFundsModal = () => {
    setShowWithdrawFundsModal(true);
  };
  const handleCloseWithdrawFundsModal = () => {
    setShowWithdrawFundsModal(false);
  };
  const handleInterestActionClick = () => {
    navigate("/borrow");
  };

  useEffect(() => {
    setCreditLineData(walletDetails[0]);
  }, [walletDetails]);

  useEffect(() => {
    setWalletDetails(
      assetsList?.filter((item) => {
        return item?.abbr === pathNameWallet;
      })
    );
  }, [pathNameWallet, assetsList]);

  useEffect(() => {
    dispatch(resetAssets());
    dispatch(getAssetsAction());
  }, []);

  useEffect(() => {
    if (location?.pathname.includes("/wallet/ETH")) {
      setPathNameWallet("ETH");
    } else if (location?.pathname.includes("/wallet/BTC")) {
      setPathNameWallet("BTC");
    } else if (location?.pathname.includes("/wallet/USDC")) {
      setPathNameWallet("USDC");
    } else if (location?.pathname.includes("/wallet/USDT")) {
      setPathNameWallet("USDT");
    }
  }, []);

  return (
    <>
      <RenderIf isTrue={assetsListLoading}>
        <Spinner className="m-20-auto" id="loanSpinner" />
      </RenderIf>

      <RenderIf isTrue={!assetsListLoading}>
        <div className="common_bg">
          {/* Total Balance */}
          <WalletBalanceCard
            type={walletDetails[0]?.abbr}
            balance={parseFloat(
              walletTotalBalance(walletDetails[0]?.activeLoanBalance)
            ).toFixed(8)}
            balanceInUsd={parseFloat(
              walletTotalBalance(walletDetails[0]?.activeLoanBalanceInUsd)
            ).toFixed(8)}
          />
          <div className="saving_container">
            {/* Credit Line Wallet */}
            <SavingWalletCard
              icon={setTokenIcon(walletDetails[0]?.abbr)}
              assetType={walletDetails[0]?.abbr}
              balanceAmount={parseFloat(
                walletDetails[0]?.creditLineBalance
              ).toFixed(8)}
              balanceSpanAmount={parseFloat(
                walletDetails[0]?.creditLineBalanceInUsd
              ).toFixed(8)}
              savingCreditTitle="Credit Line Wallet"
              // apyPercentVal="15% LTV"
              // apyPercentClassName="credit_apy_percent"
              interest={false}
              btnText="Withdraw Funds"
              handleWithdrawFundsModal={handleOpenWithdrawFundsModal}
              apyPercent = { false }
            />
            {/* Collateral */}
            <TermsAndCollateralCard
              assetType={walletDetails[0]?.abbr}
              flexTitle="Collateral"
              icon={setTokenIcon(walletDetails[0]?.abbr)}
              balanceAmount={parseFloat(
                walletDetails[0]?.totalCollateralInToken
              ).toFixed(8)}
              balanceSpanAmount={parseFloat(
                walletDetails[0]?.totalCollateralInUsd
              ).toFixed(8)}
              intersetPercent="10%"
              intersetPara={true}
              interest_action="Borrow"
              handleInterestActionClick={handleInterestActionClick}
            />
          </div>
        </div>
      </RenderIf>
      <WithdrawFundsModal
        show={showWithdrawFundsModal}
        onHide={handleCloseWithdrawFundsModal}
        modalWidth="modal-width-760 pl-0 withdraw_funds_modal"
        creditLineData={creditLineData}
      />
    </>
  );
};

export default CreditLine;
