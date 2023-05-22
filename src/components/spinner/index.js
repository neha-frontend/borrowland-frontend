import "./spinner.css";

const Spinner = ({ className = "", id = "" }) => (
  <div className={` ${className} loader`} id={id} />
);

export default Spinner;
