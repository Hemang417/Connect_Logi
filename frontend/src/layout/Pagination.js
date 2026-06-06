import React, { useEffect, useState } from "react";
import { CPagination, CPaginationItem } from "@coreui/react";
import ArrowCircleLeft from "src/views/buttons/buttons/ArrowCircleLeft";
import styles from "../css/pagination.module.css";
import { useSelector } from "react-redux"; // Or your state management import

function Pagination({ currentPage, totalPages, paginate }) {
  // State to track if sidebar is expanded
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  // Get sidebar state directly from your state management
  const sidebarShow = useSelector((state) => state.sidebarShow);

  // Effect to detect sidebar state and changes
  useEffect(() => {
    // Initial check for sidebar state
    const checkSidebarState = () => {
      // This selector should match your sidebar element - adjust as needed
      const sidebar =
        document.querySelector(".sidebar") ||
        document.getElementById("sidebar");
      if (sidebar) {
        // Check if sidebar is expanded using your app's specific indicator
        // This could be a class, inline style, or data attribute
        const isExpanded =
          !sidebar.classList.contains("sidebar-minimized") &&
          !sidebar.classList.contains("collapsed");
        setSidebarExpanded(isExpanded);
      }
    };

    // Run initial check
    checkSidebarState();

    // Set up mutation observer to watch for sidebar changes
    const observer = new MutationObserver(checkSidebarState);
    const sidebar =
      document.querySelector(".sidebar") || document.getElementById("sidebar");

    if (sidebar) {
      observer.observe(sidebar, {
        attributes: true,
        attributeFilter: ["class", "style"],
      });
    }

    // Clean up observer on component unmount
    return () => observer.disconnect();
  }, []);

  // Ensure totalPages is at least 1
  totalPages = Math.max(totalPages, 1);

  const getVisiblePages = (current, total) => {
    const maxVisible = 5; // Change as needed
    const pages = [];
    if (total <= maxVisible) {
      // No need for ellipsis
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      if (current <= maxVisible - 2) {
        // Show first few, then ellipsis and last page
        for (let i = 1; i <= maxVisible - 1; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(total);
      } else if (current >= total - 2) {
        // Show first, ellipsis, then last few
        pages.push(1);
        pages.push("ellipsis");
        for (let i = total - 3; i <= total; i++) {
          pages.push(i);
        }
      } else {
        // Show first, ellipsis, middle pages, last
        pages.push(1);
        pages.push("ellipsis");
        // pages.push(current - 1);
        pages.push(current);
        pages.push(current + 1);
        pages.push("ellipsis");
        pages.push(total);
      }
    }
    return pages;
  };

  const visiblePages = getVisiblePages(currentPage, totalPages);

  // Pagination container with dynamic positioning
  const paginationContainerStyle = {
    position: "fixed",
    bottom: "-14px",
    left: "0",
    right: "0",
    display: "flex",
    justifyContent: "center",
    zIndex: 100,
    transition: "padding-left 0.3s ease",
    paddingLeft: sidebarShow ? "256px" : "0",
  };

  return (
    <div className="pagination-wrapper" style={paginationContainerStyle}>
      {totalPages > 1 && (
        <CPagination
          align="center"
          aria-label="Page navigation example"
          className="mt-3"
        >
          <div
            style={{
              marginRight: "5px",
              pointerEvents: currentPage === 1 ? "none" : "auto",
              opacity: currentPage === 1 ? 0.5 : 1,
              transition: "opacity 0.3s ease",
            }}
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
          >
            <ArrowCircleLeft />
          </div>
          <div className={styles.paginationContainer}>
            {visiblePages.map((page, index) =>
              page === "ellipsis" ? (
                <CPaginationItem
                  key={`ellipsis-${index}`}
                  style={{
                    borderRadius:
                      page === 1
                        ? "15px 0 0 15px"
                        : page === totalPages
                        ? "0 15px 15px 0"
                        : "0",
                    backgroundColor: "transparent",
                  }}
                >
                  ...
                </CPaginationItem>
              ) : (
                <CPaginationItem
                  key={page}
                  onClick={() => paginate(page)}
                  className={
                    page === currentPage ? styles.active : styles.inActive
                  }
                  style={{
                    borderRadius:
                      page === 1
                        ? "15px 0 0 15px"
                        : page === totalPages
                        ? "0 15px 15px 0"
                        : "0",
                    backgroundColor: "transparent",
                  }}
                >
                  {page}
                </CPaginationItem>
              )
            )}
          </div>
          <div
            style={{
              marginLeft: "5px",
              pointerEvents: currentPage === totalPages ? "none" : "auto",
              opacity: currentPage === totalPages ? 0.5 : 1,
              transition: "opacity 0.3s ease",
            }}
            onClick={() =>
              currentPage < totalPages && paginate(currentPage + 1)
            }
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="26"
                width="26"
                viewBox="0 -3 28 28"
                className={styles.svg}
              >
                <path d="M11.4313 0.0625C9.26186 0.0625 7.14117 0.705806 5.33737 1.91107C3.53357 3.11633 2.12767 4.82941 1.29748 6.83369C0.467277 8.83797 0.250059 11.0434 0.673291 13.1711C1.09652 15.2989 2.14119 17.2533 3.6752 18.7873C5.20921 20.3213 7.16365 21.366 9.29138 21.7892C11.4191 22.2125 13.6246 21.9953 15.6288 21.1651C17.6331 20.3349 19.3462 18.929 20.5515 17.1252C21.7567 15.3214 22.4 13.2007 22.4 11.0312C22.397 8.1231 21.2403 5.33494 19.184 3.27856C17.1276 1.22219 14.3394 0.0655711 11.4313 0.0625ZM11.4313 20.3125C9.59562 20.3125 7.80119 19.7682 6.27489 18.7483C4.7486 17.7285 3.559 16.279 2.85652 14.583C2.15405 12.8871 1.97025 11.021 2.32837 9.22057C2.68648 7.42018 3.57044 5.76642 4.86844 4.46842C6.16645 3.17041 7.82021 2.28646 9.6206 1.92834C11.421 1.57022 13.2871 1.75402 14.9831 2.45649C16.679 3.15897 18.1285 4.34857 19.1484 5.87486C20.1682 7.40116 20.7125 9.19559 20.7125 11.0312C20.7097 13.4919 19.731 15.851 17.991 17.591C16.2511 19.331 13.892 20.3097 11.4313 20.3125ZM16.247 10.4343C16.3254 10.5127 16.3877 10.6057 16.4301 10.7081C16.4726 10.8106 16.4944 10.9204 16.4944 11.0312C16.4944 11.1421 16.4726 11.2519 16.4301 11.3544C16.3877 11.4568 16.3254 11.5498 16.247 11.6282L12.872 15.0032C12.7137 15.1615 12.4989 15.2505 12.275 15.2505C12.0511 15.2505 11.8364 15.1615 11.6781 15.0032C11.5198 14.8449 11.4308 14.6301 11.4308 14.4062C11.4308 14.1823 11.5198 13.9676 11.6781 13.8093L13.6134 11.875H7.21253C6.98875 11.875 6.77414 11.7861 6.61591 11.6279C6.45767 11.4696 6.36878 11.255 6.36878 11.0312C6.36878 10.8075 6.45767 10.5929 6.61591 10.4346C6.77414 10.2764 6.98875 10.1875 7.21253 10.1875H13.6134L11.6781 8.2532C11.5198 8.09488 11.4308 7.88015 11.4308 7.65625C11.4308 7.43235 11.5198 7.21762 11.6781 7.0593C11.8364 6.90097 12.0511 6.81203 12.275 6.81203C12.4989 6.81203 12.7137 6.90097 12.872 7.0593L16.247 10.4343Z" />
              </svg>
            </span>
          </div>
        </CPagination>
      )}
    </div>
  );
}

export default Pagination;
