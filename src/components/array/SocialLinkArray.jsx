import {
  TWITTER,
  LINKEDIN,
  INSTAGRAM,
  TWITTER_COLORED,
  LINKEDIN_COLORED,
  INSTAGRAM_COLORED,
} from "../../assets/images";

const SOCIAL_LINK_ARRAY = [
  {
    id: 1,
    name: "Linkedin",
    logo: LINKEDIN,
    hoverIcon: LINKEDIN_COLORED,
    redirectTo: " https://www.linkedin.com/company/borrowland/",
  },
  {
    id: 2,
    name: "Instagram",
    logo: INSTAGRAM,
    hoverIcon: INSTAGRAM_COLORED,
    redirectTo: "https://www.instagram.com/borrowland_org/",
  },
  {
    id: 3,
    name: "Twitter",
    logo: TWITTER,
    hoverIcon: TWITTER_COLORED,
    redirectTo: "https://twitter.com/borrowland_org",
  },
];

export default SOCIAL_LINK_ARRAY;
