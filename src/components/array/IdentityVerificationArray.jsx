import {
  IDENTITY_VERIFY_ICON,
  PERSONAL_INFO_ICON,
  VERIFY_EMAIL_ICON,
} from "../../assets/images";

const IDENTITY_VERIFICATION_ARRAY = [
  {
    id: 1,
    title: "Verify Email",
    text: "Complete Identiy Verification to unlock all features",
    image: VERIFY_EMAIL_ICON,
    actionType: "VERIFY_EMAIL",
  },
  {
    id: 2,
    title: "Personal Info",
    text: "Submit your personal information and add a mobile phone number",
    image: PERSONAL_INFO_ICON,
  },
  {
    id: 3,
    title: "Identity Verification",
    text: "Complete Identity Verfication to unlock all features",
    image: IDENTITY_VERIFY_ICON,
    actionType: "IDENTITY_VERIFICATION",
  },
];

export default IDENTITY_VERIFICATION_ARRAY;
