import React, { Suspense, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";

import LayoutWrapper from "./components/layoutWrapper";
import Spinner from "./components/spinner";
import { guestRoutes, userRoutes } from "./routes/mainRoutes/mainRoutes";
import { setUserDetailsSuccess } from "store/sagaActions";
import { resetUserDetails } from "store/sagaActions";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { ToastContainer } from "react-toastify";

function App() {
  const dispatch = useDispatch();

  const { authToken } = useSelector((state) => state?.auth?.otpVerification);
  const { userData } = useSelector((state) => state?.user?.userDetails);

  const token = sessionStorage.getItem("authToken");

  const [routes, setRoutes] = useState([]);

  let mainContent = routes.map((route) =>
    route.component ? (
      <Route
        key={route.name}
        path={route.path}
        exact={route.exact}
        name={route.name}
        element={<route.component />}
      />
    ) : (
      route.redirectRoute && (
        <Route
          path="*"
          key={route.name}
          element={<Navigate key={route.name} to={route.path} />}
        />
      )
    )
  );
  useEffect(() => {
    dispatch(resetUserDetails());
  }, []);

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      dispatch(setUserDetailsSuccess({ data: decoded?.user }));
    }
  }, [token, authToken]);

  useEffect(() => {
    if (!!token || userData) {
      setRoutes(userRoutes);
    } else {
      setRoutes(guestRoutes);
    }
  }, [token, userData]);

  return (
    <Suspense fallback={<Spinner />}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<LayoutWrapper isAuthenticated={!!token || userData} />}
          >
            {mainContent}
          </Route>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme="colored"
        />
      </Router>
    </Suspense>
  );
}

export default App;
