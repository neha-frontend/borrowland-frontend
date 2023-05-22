import { useState } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  ARROW_UP_SVG,
  POLYGON_DOWN_SVG,
  POLYGON_UP_SVG,
  WALLET_ICON,
} from "../../assets/images";
import {
  DepositModal,
  WithdrawModal,
  WithdrawPreview,
  NoDataFound,
} from "components";
import { assetIcon } from "components/reusableFunctions/reusableFuctions";

import "./index.css";

const StableTableCard = () => {
  const navigate = useNavigate();

  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showWithdrawPreviewModal, setShowWithdrawPreviewModal] =
    useState(false);
  const [previewData, setPreviewData] = useState({
    assets: "",
    network: "",
    receiverAddress: "",
    amount: "",
  });
  const [withdrawType, setWithdrawType] = useState("");

  const { assetsList } = useSelector((state) => state.user.assets);
  const filteredAssetList = assetsList.filter(
    (item) => item?.abbr === "USDC" || item?.abbr === "USDT"
  );

  const handleOpenDepositModal = () => {
    setShowDepositModal(true);
  };

  const handleCloseDepositModal = () => {
    setShowDepositModal(false);
  };

  const handleOpenWithdrawModal = () => {
    setShowWithdrawModal(true);
  };

  const handleCloseWithdrawModal = () => {
    setShowWithdrawModal(false);
    setShowWithdrawPreviewModal(true);
  };

  return (
    <>
      <div className="plr_30" id="my_table">
        <div className="scroll_table">
          <Table>
            <thead>
              <tr>
                <th className="sr_num">#</th>
                <th>Name</th>
                <th>Balance</th>
                <th>Market Place</th>
                <th>Credit Line</th>
                <th>Earn interset</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filteredAssetList.length > 0 ? (
                filteredAssetList.map((item, index) => {
                  return (
                    <>
                      <tr>
                        <td className="sr_num_ans">
                          <div className="centered_content">{index + 1}</div>
                        </td>
                        {/* name */}
                        <td>
                          <div className="centered_content">
                            <div className="coin_wrapper">
                              <div className="coin_img">
                                <img src={assetIcon(item?.abbr)} alt="coin" />
                              </div>
                              <div className="coin_value_wrapper">
                                <p className="coin_title">{item?.abbr}</p>
                                <p className="coin_value">{item?.assetName}</p>
                              </div>
                            </div>
                          </div>
                        </td>
                        {/* balance */}
                        <td>
                          <div className="centered_content">
                            <p className="coin_title">
                              {item?.abbr}{" "}
                              {item?.savingBalance > 0
                                ? parseFloat(item?.savingBalance).toFixed(8)
                                : item?.savingBalance}
                            </p>
                            <p className="coin_value">
                              ${" "}
                              {item?.savingBalanceInUsd > 0
                                ? parseFloat(item?.savingBalanceInUsd).toFixed(
                                    8
                                  )
                                : item?.savingBalanceInUsd}
                            </p>
                          </div>
                        </td>
                        {/* market place */}
                        <td>
                          <div className="centered_content">
                            <p className="coin_title">{item?.abbr}</p>
                            <div className="d-flex mt-1">
                              <p
                                className={
                                  item?.marketplace_24h_change > 0
                                    ? "green_text"
                                    : "red_text"
                                }
                              >
                                24H
                              </p>
                              <img
                                className="mx-2"
                                src={
                                  item?.marketplace_24h_change > 0
                                    ? POLYGON_UP_SVG
                                    : POLYGON_DOWN_SVG
                                }
                                alt="down_arrow"
                              />
                              <p
                                className={
                                  item?.marketplace_24h_change > 0
                                    ? "green_text"
                                    : "red_text"
                                }
                              >
                                {item?.marketplace_24h_change}%
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* credit line */}
                        <td>
                          <div className="centered_content">
                            <p className="coin_title">
                              {item?.abbr}{" "}
                              {item?.creditLineBalance > 0
                                ? parseFloat(item?.creditLineBalance).toFixed(8)
                                : item?.creditLineBalance}
                            </p>
                            <p className="coin_value">
                              ${" "}
                              {item?.creditLineBalanceInUsd > 0
                                ? parseFloat(
                                    item?.creditLineBalanceInUsd
                                  ).toFixed(8)
                                : item?.creditLineBalanceInUsd}
                            </p>
                          </div>
                        </td>
                        {/* earn interest */}
                        <td>
                          <div className="centered_content">
                            <p className="interest_box">
                              <img src={ARROW_UP_SVG} alt="top_arrow" />
                              Upto {item?.earnInterest}%
                            </p>
                          </div>
                        </td>
                        {/*  modal */}
                        <td>
                          <div className="centered_content">
                            <div className="bt_table_wrapper">
                              <button
                                className="btn btn-primary"
                                onClick={() => {
                                  setWithdrawType(item?.abbr);
                                  handleOpenDepositModal();
                                }}
                              >
                                Deposit
                              </button>
                              <button
                                className="btn bg-transparent text_blue transaparent_border"
                                onClick={() => {
                                  setWithdrawType(item?.abbr);
                                  handleOpenWithdrawModal();
                                }}
                              >
                                Withdraw
                              </button>
                              <button
                                className="wallet_btn bg-transparent"
                                onClick={() =>
                                  navigate(`/wallet/${item?.abbr}`, {
                                    state: { wallet: item?.abbr },
                                  })
                                }
                              >
                                <img src={WALLET_ICON} alt="wallet" />
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="px-0">
                    <NoDataFound text="No Assets Found" />
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
      <DepositModal
        show={showDepositModal}
        onHide={() => setShowDepositModal(false)}
        modalWidth="modal_width_530 pl-0"
        handleConfirmClick={handleCloseDepositModal}
        depositType={withdrawType}
      />
      <WithdrawModal
        show={showWithdrawModal}
        showNext={handleCloseWithdrawModal}
        onHide={() => setShowWithdrawModal(false)}
        modalWidth="modal-width-460 withdraw_modal_dialog"
        withdrawType={withdrawType}
        setPreviewData={setPreviewData}
      />
      <WithdrawPreview
        show={showWithdrawPreviewModal}
        onHide={() => setShowWithdrawPreviewModal(false)}
        modalWidth="modal-width-460 withdraw_modal_dialog"
        previewData={previewData}
      />
    </>
  );
};

export default StableTableCard;
