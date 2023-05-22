import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { setTokenIcon } from "components/reusableFunctions/reusableFuctions";
import {
  InterestModal,
  SavingWalletCard,
  TermsAndCollateralCard,
  TransferModal,
  WalletBalanceCard,
  TransferPreview,
  Spinner,
} from "../../../../components";
import { RenderIf } from "utils";
import { resetAssets, getAssetsAction } from "store/sagaActions";

import "./index.css";

const Saving = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const notify = (toastMessage) => toast.success(toastMessage);

  const { assetsList, isLoading: assetsListLoading } = useSelector(
    (state) => state.user.assets
  );

  const [walletDetails, setWalletDetails] = useState("");
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showTransferPreviewModal, setShowTransferPreviewModal] =
    useState(false);
  const [pathNameWallet, setPathNameWallet] = useState("");
  const [interestData, setInterestData] = useState("");

  const [previewData, setPreviewData] = useState({
    asset: "",
    network: "",
    timeStamp: "",
    fromAddress: "",
    toAddress: "",
    amount: "",
    transactionFee: "",
  });
  const handleOpenInterestModal = () => {
    setShowInterestModal(true);
  };
  const handleCloseInterestModal = () => {
    setShowInterestModal(false);
  };

  const handleOpenTransferModal = () => {
    setShowTransferModal(true);
  };
  const handleCloseTransferModal = () => {
    setShowTransferModal(false);
    setShowTransferPreviewModal(true);
  };

  const handleCloseTransferPreviewModal = () => {
    setShowTransferPreviewModal(false);
    notify("Your transfer has been successfully done");
  };

  const handleInterestActionClick = (walletDetails) => {
    navigate(`/wallet/${walletDetails?.abbr}/fixed-terms`, {
      state: {
        walletDetails: walletDetails,
      },
    });
  };

  useEffect(() => {
    setInterestData(walletDetails[0]);
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
          <WalletBalanceCard
            type={walletDetails[0]?.abbr}
            balance={parseFloat(
              walletDetails[0]?.savingBalance +
                walletDetails[0]?.interestInToken
            ).toFixed(8)}
            balanceInUsd={parseFloat(
              walletDetails[0]?.savingBalanceInUsd +
                walletDetails[0]?.interestInUsd
            ).toFixed(8)}
          />
          <div className="saving_container">
            <SavingWalletCard
              savingCreditTitle="Saving Wallet"
              icon={setTokenIcon(walletDetails[0]?.abbr)}
              assetType={walletDetails[0]?.abbr}
              balanceAmount={parseFloat(
                walletDetails[0]?.savingBalance
              ).toFixed(8)}
              balanceSpanAmount={parseFloat(
                walletDetails[0]?.savingBalanceInUsd
              ).toFixed(8)}
              apyPercentVal="Earning up to 12%"
              apyPercentClassName=""
              interest={true}
              btnText="Transfer to another wallet"
              handleInterestModal={handleOpenInterestModal}
              handleTransferModal={handleOpenTransferModal}
            />
            <TermsAndCollateralCard
              flexTitle="FLEX Terms"
              apyFlexPercent={true}
              assetType={walletDetails[0]?.abbr}
              icon={setTokenIcon(walletDetails[0]?.abbr)}
              balanceAmount={parseFloat(
                walletDetails[0]?.totalFixedTermInToken
              ).toFixed(8)}
              balanceSpanAmount={parseFloat(
                walletDetails[0]?.totalFixedTermInUsd
              ).toFixed(8)}
              flexTermsTitle={true}
              intersetPercent="12%"
              interest_action="Fixed Terms"
              handleInterestActionClick={() =>
                handleInterestActionClick(walletDetails[0])
              }
            />
          </div>
        </div>
      </RenderIf>

      <InterestModal
        show={showInterestModal}
        onHide={() => setShowInterestModal(false)}
        modalWidth="modal-width-460 pl-0 interest_modal_dialog"
        handleConfirmClick={handleCloseInterestModal}
        interestData={interestData}
      />
      <TransferModal
        show={showTransferModal}
        onHide={() => setShowTransferModal(false)}
        modalWidth="modal-width-460 pl-0 transfer_modal"
        showNext={handleCloseTransferModal}
        transferData={interestData}
        setPreviewData={setPreviewData}
      />
      <TransferPreview
        show={showTransferPreviewModal}
        onHide={() => setShowTransferPreviewModal(false)}
        handlePreviewClick={handleCloseTransferPreviewModal}
        modalWidth="modal-width-460 withdraw_modal_dialog"
        previewData={previewData}
      />
    </>
  );
};

export default Saving;
