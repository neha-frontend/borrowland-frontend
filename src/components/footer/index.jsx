import { useState, useEffect } from "react";
import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

// import { subscribeValidator } from "../../validations/subscribeValidator";
import { BORROWLAND_LOGO_SVG } from "../../assets/images";
import PrimaryButton from "../buttons/primaryButton";
import SocialMediaCard from "../card/SocialMediaCard";
import { CustomInput } from "../customComponent";
import ContactUsCard from "../card/ContactUsCard";
import SOCIAL_LINK_ARRAY from "../array/SocialLinkArray";
import {
  agentSignUp,
  subscribeAction,
  resetSubscribeMsg,
} from "store/sagaActions";
import { VALID_EMAIL } from "constants/validationMessages";
import { EMAIL_REGEX } from "constants/regexConstants";

import "./index.css";

const FooterBar = () => {
  const dispatch = useDispatch();
  const { subscribeLoading } = useSelector((state) => state.user.userDetails);

  const [isLoading, setIsLoading] = useState(false);

  const notify = (toastMessage) => toast.success(toastMessage);
  const notifyError = (toastMessage) => toast.error(toastMessage);

  const createInitialValue = {
    email: "",
  };

  const handleSubmit = (values) => {
    const isValid = EMAIL_REGEX.test(values.email);

    if (isValid) {
      dispatch(
        subscribeAction({
          data: {
            subscribedEmail: values.email,
          },
          notify,
        })
      );
    } else {
      notifyError(VALID_EMAIL);
    }
  };
  const handleAgentClick = () => {
    setIsLoading(true);
    dispatch(agentSignUp({ setIsLoading }));
  };

  useEffect(() => {
    dispatch(resetSubscribeMsg());
  }, []);

  return (
    <>
      <div className="footer_wrapper">
        <div className="container">
          <div className="footer_box">
            <div className="footer_icon_area">
              <img src={BORROWLAND_LOGO_SVG} alt="footer-icon" />
              <p className="footer_icon_title pt-2 pb-4 grey500">
                Let your crypto work for you.
              </p>
              {/* social media */}
              <div className="d-flex justify-content-between align-items-center mx-110">
                {SOCIAL_LINK_ARRAY.map((item) => {
                  return (
                    <SocialMediaCard
                      key={item?.id}
                      name={item?.name}
                      icon={item?.logo}
                      hoverIcon={item?.hoverIcon}
                      redirectTo={item?.redirectTo}
                    />
                  );
                })}
              </div>
            </div>

            {/* contact */}
            <ContactUsCard
              title="CONTACT US"
              address="57 Crystal Beach Dr, Nepean Toronto, Ontario K2H5N3, CA"
              // contactNumber="800.275.8777"
              email="info@borrowland.io"
              agent="Become an agent"
              onClick={() => handleAgentClick()}
              disable={isLoading}
            />

            {/* subscribe */}
            <div className="footer_Update">
              <p className="footer_title mb-3">SIGN UP FOR EMAIL UPDATES</p>
              <div id="">
                <Formik
                  initialValues={createInitialValue}
                  // validationSchema={subscribeValidator}
                  onSubmit={(values) => {
                    handleSubmit(values);
                  }}
                >
                  <Form id="subscribe_input">
                    <div className="form_wrapper">
                      <Field
                        component={CustomInput}
                        name="email"
                        placeholder="Your e-mail address"
                        type="text"
                      />
                    </div>

                    <PrimaryButton
                      className="mt-3 w-100 mb-5"
                      type="submit"
                      text={
                        subscribeLoading ? (
                          <ClipLoader
                            color="#fff"
                            size={30}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                          />
                        ) : (
                          "Subscribe"
                        )
                      }
                    />
                  </Form>
                </Formik>
                <p className="updating_text">
                  Sign up with your email address to receive news and updates
                </p>
              </div>
            </div>
          </div>

          {/* copyright */}
          <div className="footer-bottom pb-4">
            <div className="footer-credits">
              <p className="footer-copyright">
                Copyright ©2023 BORROWLAND INVESTMENT TECHNOLOGY LIMITED. All
                rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterBar;
