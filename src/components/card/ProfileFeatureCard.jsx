import { FEATURE_CHECK_ICON } from "../../assets/images";

const ProfileFeatureCard = ({ key, image, title, text }) => {
  return (
    <div key={key} className="border_box">
      <div className="p-3 d-flex justify-content-between">
        <img src={image} alt="info" className="mr-2 cursor_pointer" />
        <div className="">
          <p className="title">{title}</p>
          <p className="text mt-2">{text}</p>
        </div>
        <img
          src={FEATURE_CHECK_ICON}
          alt="info"
          className="mr-2 cursor_pointer"
        />
      </div>
    </div>
  );
};

export default ProfileFeatureCard;
