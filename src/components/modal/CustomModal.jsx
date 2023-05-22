import Modal from "react-bootstrap/Modal";

import { CLOSE_ICON_SVG } from "../../assets/images";
import { RenderIf } from "../../utils";

const CustomModal = (props) => {
  const {
    modalWidth="",
    mainClassName = "",
    className = "",
    modalSize = "md",
    showModal = false,
    showCloseButton = true,
    closeModal,
    children,
    FooterComponent = "",
  } = props;

  return (
    <>
      <Modal
        show={showModal}
        size={modalSize}
        aria-labelledby="contained-modal-title-vcenter"
        className={mainClassName + modalWidth}
        centered
      >
        {/* <RenderIf isTrue={showCloseButton}>
          <div className="w-100 align-text-end px-2 pt-1 cursor-pointer">
            <img src={CLOSE_ICON_SVG} alt="crossicon" onClick={closeModal} />
          </div>
        </RenderIf> */}
        <RenderIf isTrue={showCloseButton}>
          <div className="closing_icon curser-pointer">
            <img alt="close_icon" src={CLOSE_ICON_SVG} onClick={closeModal} />
          </div>
        </RenderIf>
        <div className={`${className} ${!showCloseButton ? "pt-4" : ""}`}>
          {children}
        </div>
        <RenderIf isTrue={FooterComponent}>
          <Modal.Footer>
            <FooterComponent />
          </Modal.Footer>
        </RenderIf>
      </Modal>
    </>
  );
};

export default CustomModal;
