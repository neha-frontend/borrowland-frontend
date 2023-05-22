import { BACKGROUND_LOGIN } from "../assets/images";
import "../assets/styles/index.css";

const GuestRouteLayout = ({ children }) => {
  return (
    <div className="guest-container">
      <div className="position-relative"> 
      <img src={BACKGROUND_LOGIN} className="bg_login"/>
       {children}
        </div>
    </div>
  );
};

export default GuestRouteLayout;
