const AddBannerCard = ({ image = "", alt = "", className = "" }) => {
  return <img src={image} alt={alt} className={className} />;
};

export default AddBannerCard;
