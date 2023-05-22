import { NO_DATA_FOUND_SVG } from "assets/images";

const NoDataFound = ({ text = "", id = "", imageClassName }) => {
  return (
    <div className="d-flex flex-column no_data_found_container" id={id}>
      <img
        src={NO_DATA_FOUND_SVG}
        alt="no-data"
        className={`no-data-found-img h-w-100 ${imageClassName}`}
      />
      <p className="no_data_text">{text}</p>
    </div>
  );
};

export default NoDataFound;
