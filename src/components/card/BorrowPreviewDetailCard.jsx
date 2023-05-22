const BorrowPreviewDetailCard = ({ title, value, image }) => {
  return (
    <div className="borrow_proper_wapper">
      <div className="quest">
        <p className="borrow_preview_title">{title}</p>
      </div>
      <div className="d-flex align-items-center anst">
        {image && <img src={image} className="mr-2 borrow_coin" alt="coin" />}
        <p className="borrow_preview_ans">{value}</p>
      </div>
    </div>
  );
};

export default BorrowPreviewDetailCard;
