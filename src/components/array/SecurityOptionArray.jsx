import {
  CLOSE_ACCOUNT_SVG,
  SECURITY_CHANGE_PASSWORD,
} from "../../assets/images";

const SECURITY_OPTION_ARRAY = [
  {
    id: 1,
    title: "Change Password",
    text: "Change your password, see your account e-mail details, and monitor the logins to your account.",
    image: SECURITY_CHANGE_PASSWORD,
    to: "/security/change-password",
    buttonText: "Change Password",
  },
  {
    id: 2,
    title: "Close Account",
    text: "Please make sure your account balance is $0.00 before you begin.",
    image: CLOSE_ACCOUNT_SVG,
    to: "/security/close-account",
    buttonText: "Close Account",
  },
];

export default SECURITY_OPTION_ARRAY;
