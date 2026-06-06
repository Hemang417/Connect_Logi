import React from "react";
import {
  AppContent,
  AppSidebar,
  AppFooter,
  AppHeader,
} from "../components/index";
import Pagination from "src/views/base/paginations/Paginations";
import { useLocation } from "react-router-dom";
import Footer from "../components/footer/Footer";

const DefaultLayout = () => {
  const location = useLocation();
  const errorPaths = [
    "/FiveZeroZero",
    "/FourZeroFour",
    "/FiveZeroThree",
    "/FourZeroThree",
    "/FourZeroOne",
  ];

  return (
    <div>
      {!errorPaths.includes(location.pathname) && <AppSidebar />}

      <div className="wrapper d-flex flex-column min-vh-100">
        {!errorPaths.includes(location.pathname) && <AppHeader />}

        <div className="body flex-grow-1 px-0" style={{}}>
          <AppContent />
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
