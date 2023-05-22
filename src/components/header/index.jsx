import moment from "moment";
import { useEffect, useState } from "react";
import { Dropdown, Form, Nav } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocketConfig from "sockets";

import {
  BORROWLAND_LOGO_SVG,
  CLOSE,
  DOWN_ARROW,
  HAMBURGUR,
  LOGOUT,
  NEW_NOTIFICATION_SVG,
  NOTIFICATION,
  PROFILE_CIRCLE,
  QUESTION,
  UP_ARROW,
  VERIFIED_NOTIFICATION,
} from "../../assets/images";
import HEADER_TAB_ARRAY from "../array/HeaderTabArray";
import HeaderTabCard from "../card/HeaderTabCard";
import LogoutModal from "../modal/user/LogoutModal";
import {
  formatDate,
  formatTime,
} from "components/reusableFunctions/reusableFuctions";

import "./index.css";

const Headerbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  const [responsiveDropdown, setResponsiveDropdown] = useState(false);
  const [navShow, setNavShow] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [notificationData, setNotificationData] = useState("");

  const { userData } = useSelector((state) => state.user.userDetails);
  const role = userData?.userRole;
  const profileName = userData?.fullName || "Darrell Steward";

  const handleNotificationClick = () => {
    //
  };

  const handleOpenLogoutModal = () => {
    setShowLogoutModal(true);
  };
  const handleCloseLogoutModal = () => {
    setShowLogoutModal(false);
  };

  const showDropdownHandle = () => {
    if (responsiveDropdown) setResponsiveDropdown(false);
    else setResponsiveDropdown(true);
  };

  const showSidebar = () => {
    setShow(true);
    setNavShow(false);
  };
  const handleCloseLink = () => {
    setResponsiveDropdown(false);
    setShow(false);
    setNavShow(true);
  };
  useEffect(() => {
    const socket = SocketConfig();
    socket.on("connect", () => {
      socket.emit("join", { userId: userData?._id });
    });

    socket.on("notification", (data) => {
      setNotificationData(data);
    });
  }, [userData?._id]);

  const markAsRead = () => {
    const socket = SocketConfig();
    socket.on("connect", () => {
      socket.emit("mark-read", { userId: userData?._id });
    });
  };
  const handleTimeCalculation = (time) => {
    const currentTime = moment(+new Date());
    const createdTime = moment(time);
    const diffSeconds = currentTime.diff(createdTime, "seconds");
    const diffMinutes = currentTime.diff(createdTime, "minutes");
    const diffHRS = currentTime.diff(createdTime, "hours");
    const diffDays = currentTime.diff(createdTime, "days");

    if (diffSeconds < 60 && diffMinutes < 1) {
      return `${diffSeconds} sec ago`;
    } else if (diffMinutes < 60 && diffDays < 1) {
      return `${diffMinutes} min ago`;
    } else if (diffHRS < 24 && diffDays < 1) {
      return `${diffHRS} hrs ago`;
    } else {
      return ` ${formatTime(time, false)}, ${formatDate(time, "DD-MM-YYYY")}`;
    }
  };
  const showNotification = () => {
    return (
      <Dropdown.Menu className="notification_dropdown_box">
        <div className="d-flex align-items-center justify-content-between notification_title">
          <p className="notification_title_text">Notification</p>
          <Dropdown.Toggle className="not_close_btn">
            <img src={CLOSE} alt="close" />
          </Dropdown.Toggle>
        </div>
        {notificationData?.items?.length ? (
          notificationData?.items?.map((item) => (
            <Dropdown.Item
              className={`${!item.isRead ? "notification_active" : " "}`}
              key={item._id}
              onClick={markAsRead}
            >
              <div className="d-flex  position-relative  align-items-center">
                <div className="mr-3">
                  <img src={VERIFIED_NOTIFICATION} alt="verified" />
                </div>
                <div className="notification_desc">
                  <div className="notification_real">{item?.description}</div>
                  <div className="notfication_time">
                    {handleTimeCalculation(item?.createdAt)}
                  </div>
                </div>
                {!item?.isRead && <div className="notifiction_live" />}
              </div>
            </Dropdown.Item>
          ))
        ) : (
          <Dropdown.Item>
            <div className="d-flex justify-content-center">
              {/* <div className="mr-3">
										<img
											src={VERIFIED_NOTIFICATION}
											alt="verified"
										/>
									</div> */}
              <div className="notification_desc">
                <p className="notification_real">No New Notifications!</p>
                {/* <p className="notfication_time">
											a month ago
										</p> */}
              </div>
            </div>
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    );
  };
  const SideBar = () => {
    useEffect(() => {
      if (show && responsiveDropdown) {
        // setShow(false);
        return;
      }
      return () => {
        // setShow(false);
        // setNavShow(true);
        // if (responsiveDropdown) setResponsiveDropdown(false);
      };
    }, [show]);

    return (
      <>
        <div className="sidebar_nav ">
          <div className="position-relartive sidebar_container">
            <div className="close_icon">
              <div
                onClick={() => {
                  setShow(false);
                  setNavShow(true);
                  setResponsiveDropdown(false);
                }}
              >
                <img src={CLOSE} />
              </div>
            </div>
            <div className="profile_tabination_box">
              <div className="profile_tab_wrapper">
                <img src={PROFILE_CIRCLE} alt="profile-icon" className="mr-3" />
                <div className="profile_dropdown_responsive">
                  <p>{profileName}</p>
                  <img
                    src={responsiveDropdown ? UP_ARROW : DOWN_ARROW}
                    alt="arrow_click"
                    className="dropdown_arrow_down"
                    onClick={showDropdownHandle}
                  />
                </div>
              </div>
              {responsiveDropdown ? (
                <div className="profile_dropdown_links mt-3">
                  <div className="profile_state_dropdown">
                    <Link
                      to="/profile/identity-verification"
                      onClick={handleCloseLink}
                    >
                      My Profile
                    </Link>
                  </div>
                  <div className="profile_state_dropdown">
                    <Link to="/security" onClick={handleCloseLink}>
                      Security
                    </Link>
                  </div>
                  <div className="profile_state_dropdown">
                    <Link to="/my-loans" onClick={handleCloseLink}>
                      My Loans
                    </Link>
                  </div>
                  <div className="profile_state_dropdown">
                    <a onClick={handleOpenLogoutModal}>Logout</a>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="tabination_wrapper_tabs">
              {HEADER_TAB_ARRAY.filter((crr) => crr.role != role).map((i) => {
                return (
                  <>
                    <Link
                      onClick={handleCloseLink}
                      to={i.to}
                      className={`tabs_section ${
                        i.name === "Help" ? "help" : ""
                      }`}
                    >
                      <img src={i.image} alt="icon" />
                      <p className="tab_title">{i.name}</p>
                    </Link>
                  </>
                );
              })}
            </div>
          </div>
        </div>
        <div className="component_backdrop"></div>
      </>
    );
  };
  return (
    <>
      {/* Web header */}
      <Navbar
        className="p-0 header_shadow"
        bg="white"
        expand="lg"
        id="nav_container"
      >
        <Container className="">
          <Navbar.Brand>
            <img
              src={BORROWLAND_LOGO_SVG}
              alt="navbar-brand"
              className="borrowland-logo"
              onClick={() => navigate("/dashboard")}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="m-auto my-2 my-lg-0 navbar_custom"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {HEADER_TAB_ARRAY.filter((crr) => crr.role != role).map(
                (item) => {
                  return (
                    <HeaderTabCard
                      key={item?.key}
                      linkTo={item?.to}
                      linkName={item?.name}
                      linkImage={item?.image}
                      isActive={pathname === item?.to}
                    />
                  );
                }
              )}
            </Nav>

            <Form className="d-flex profile_box">
              <div data-tooltip="I am tooltip" className="down_tooltip">
                <img src={QUESTION} alt="question" onClick="" />
              </div>
              <Dropdown id="my_dropdown ">
                <Dropdown.Toggle className="dropdown_cmn ">
                  <img
                    src={
                      notificationData?.unReadCount > 0
                        ? NEW_NOTIFICATION_SVG
                        : NOTIFICATION
                    }
                    alt="notification"
                    onClick={handleNotificationClick}
                  />
                </Dropdown.Toggle>
                {showNotification()}
              </Dropdown>
              <Dropdown id="my_dropdown" className="profile_dropdown">
                <Dropdown.Toggle>
                  <img src={PROFILE_CIRCLE} />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => navigate("/profile/identity-verification")}
                  >
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate("/security")}>
                    Security
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate("/my-loans")}>
                    My Loans
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <div
                      className="d-flex align-items-center justify-content-between"
                      onClick={handleOpenLogoutModal}
                    >
                      <div> Logout</div>
                      <div>
                        <img src={LOGOUT} alt="logout" />
                      </div>
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* Tab & Mobile header */}
      {navShow ? (
        <Navbar className="tab_nav header_shadow">
          <div className="container">
            <div className="navbar_brand_tab">
              <div className="nav_icon_brand">
                <img
                  src={BORROWLAND_LOGO_SVG}
                  alt="navbar-brand"
                  className="borrowland-logo"
                />
              </div>
              <div className="d-flex">
                <Dropdown id="my_dropdown " className="mr-4">
                  <Dropdown.Toggle className="dropdown_cmn ">
                    <img
                      src={
                        notificationData?.unReadCount > 0
                          ? NEW_NOTIFICATION_SVG
                          : NOTIFICATION
                      }
                      alt="notification"
                      onClick={handleNotificationClick}
                    />
                  </Dropdown.Toggle>
                  {showNotification()}
                </Dropdown>
                <img
                  src={HAMBURGUR}
                  alt="hamburger"
                  onClick={showSidebar}
                  className="curser-pointer"
                />
              </div>
            </div>
          </div>
        </Navbar>
      ) : null}

      {show ? <SideBar /> : null}
      <LogoutModal
        showModal={showLogoutModal}
        closeModal={handleCloseLogoutModal}
      />
    </>
  );
};

export default Headerbar;
