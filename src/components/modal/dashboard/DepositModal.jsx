import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Dropdown,
  DropdownButton,
  InputGroup,
  Modal,
} from "react-bootstrap";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router";

import {
  CLOSE,
  COPY,
  NOTES,
  // QR,
  QUESTION,
  RIGHT_DARK_ARROW_SVG,
} from "../../../assets/images";
import useCopyToClipboard from "hooks/useCopyToClipboard";
import {
  dropDownCurrency,
  handleSetDropDown,
} from "components/reusableFunctions/reusableFuctions";

import "./depositmodal.css";

const DepositModal = ({
  show,
  onHide,
  modalWidth,
  depositType,
  handleConfirmClick,
}) => {
  const navigate = useNavigate();
  const [assetsValue, setAssetsValue] = useState("BTC");
  const [networkValue, setNetworkValue] = useState("Bitcoin (native) network");
  const [copyTooltipValue, setCopyTooltipValue] = useState("");
  const [address, setAddress] = useState("");
  const [, copy] = useCopyToClipboard();
  const [depositData, setDepositData] = useState("");

  const { assetsList } = useSelector((state) => state.user.assets);

  // called when deposit modal opens for the first time
  useEffect(() => {
    setAssetsValue(depositType);
    setDepositData(assetsList?.filter((item) => item?.abbr === depositType));
  }, [depositType]);

  // called when depositData is changed
  useEffect(() => {
    setAddress(depositData[0]?.savingReceiveAddress);
  }, [depositData]);

  // called when assetValue is changed from dropdown
  useEffect(() => {
    setCopyTooltipValue("");
    {
      assetsValue === "BTC"
        ? setNetworkValue("Bitcoin (native) network")
        : setNetworkValue("Goerli Test Network");
    }
    setDepositData(assetsList?.filter((item) => item?.abbr === assetsValue));
  }, [assetsValue]);

  return (
    <Modal
      className={modalWidth}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
    >
      <img
        src={CLOSE}
        alt="close"
        className="close_icon_modal"
        onClick={onHide}
      />
      <div className="deposit_modal">
        <p className="modal_title mb-4">Deposit</p>
        <div className="deposit_wrapper_modal">
          <div id="modal_deposit_dropdown">
            <div id="btc_dropdown" className="deposit_box_modal">
              <div className="flex_deposit_30">
                <p className="mx-0 deposit_titles">Assets</p>
                <InputGroup className="my-1">
                  <DropdownButton
                    title={
                      <div className="d-flex align-items-center">
                        <img src={handleSetDropDown(assetsValue)} />
                        <p className="btc_title ml-2">{assetsValue}</p>
                      </div>
                    }
                    id="input-group-dropdown-1"
                  >
                    {dropDownCurrency.map((item) => {
                      return (
                        <Dropdown.Item
                          className="pl-0"
                          key={item?.id}
                          onClick={() => setAssetsValue(item?.name)}
                        >
                          <div className="d-flex">
                            <img
                              src={item?.icon}
                              alt={item?.name}
                              className="mr-2"
                            />
                            <p className="drop_title_coin">{item?.name}</p>
                          </div>
                        </Dropdown.Item>
                      );
                    })}
                  </DropdownButton>
                </InputGroup>
              </div>
              <div className="flex_deposit_70">
                <p className="deposit_titles">Network</p>
                <InputGroup className="my-1">
                  <DropdownButton
                    title={
                      <div className="d-flex align-items-center">
                        <p className="btc_title ml-2">{networkValue}</p>
                      </div>
                    }
                    disabled
                    id="input-group-dropdown-1"
                  >
                    <Dropdown.Item className="pl-0">
                      <div className="d-flex">
                        <p className="drop_title_coin">Network 1</p>
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item className="pl-0">
                      <div className="d-flex">
                        <p className="drop_title_coin">Network 2</p>
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item className="pl-0">
                      <div className="d-flex">
                        <p className="drop_title_coin">Network 3</p>
                      </div>
                    </Dropdown.Item>
                  </DropdownButton>
                </InputGroup>
              </div>
            </div>
          </div>
          <div className="qr_code_wrapper_box">
            <p className="qr_code_title">
              Scan the QR code to deposit the amount
            </p>
            {/* {depositData &&
							depositData[0]?.savingReceiveAddress && ( */}
            {depositData[0]?.savingReceiveAddress && (
              <QRCode
                className="d-flex justify-content-center mx-auto h-w-100"
                value={`${depositData[0]?.savingReceiveAddress}`}
              />
            )}
            {/* <img
              src={QR}
              alt="qr code"
              className="d-flex justify-content-center mx-auto"
            /> */}
            <p className="text-center mb-2 mt_10 or_text">or</p>
            <p className="qr_code_title d-flex justify-content-center align-items-center mt-0">
              Copy the below address
              <div data-tooltip="I am tooltip">
                <img src={QUESTION} alt="help" className="ml-2" />
              </div>
            </p>
            <div className="copy_qr_box d-flex">
              <p>{address}</p>
              <div
                data-tooltip={`${copyTooltipValue ? copyTooltipValue : "Copy"}`}
              >
                <img
                  src={COPY}
                  alt="copy"
                  className="cursor_pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    copy(address);
                    setCopyTooltipValue("Copied");
                  }}
                />
              </div>
            </div>
            <div className="bordered_title">
              <hr />
              <p>OR</p>
              <hr />
            </div>
            <div className="swap_deposit_btn">
              <p
                className="font-weight-bold curser-pointer"
                onClick={() => {
                  navigate("/swap");
                  onHide();
                }}
              >
                Swap {assetsValue}{" "}
                <img
                  src={RIGHT_DARK_ARROW_SVG}
                  className="ml-2"
                  alt="Right_arrow"
                />
              </p>
              <img src={handleSetDropDown(assetsValue)} alt="bitcoin" />
            </div>
            <div id="notes_id">
              <div id="btc_dropdown">
                <InputGroup className="my-1">
                  <DropdownButton
                    title={
                      <div className="d-flex align-items-center">
                        <img src={NOTES} alt="notes" />
                        <p className="btc_title ml-2">Important Notes</p>
                      </div>
                    }
                    id="input-group-dropdown-1"
                  >
                    <Dropdown.Item className="pl-0">
                      <div className="d-flex">
                        <p className="drop_title_coin">Note 1</p>
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item className="pl-0">
                      <div className="d-flex">
                        <p className="drop_title_coin">Note 2</p>
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item className="pl-0">
                      <div className="d-flex">
                        <p className="drop_title_coin">Note 3</p>
                      </div>
                    </Dropdown.Item>
                  </DropdownButton>
                </InputGroup>
              </div>
            </div>
            {/* <Accordion
              id="deposit_notes"
              className="mt-3 mb-3 fixed_terms_important_terms_accordion"
            >
              <Accordion.Item eventKey="0">
                <div className="d-flex important_terms_button">
                  <p className="d-flex">
                    <img src={INFO_ICON} className="mr-1 btc_title" />
                    Important Notes
                  </p>
                  <Accordion.Header className="mb-0">
                    <img src={DROP_ICON} />
                  </Accordion.Header>
                </div>

                <Accordion.Body>
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint. Velit officia consequat duis enim velit mollit.
                  Exercitation veniam consequat sunt nostrud amet.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion> */}
          </div>
        </div>
        <Button className="w-100" onClick={handleConfirmClick}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
};

export default DepositModal;
