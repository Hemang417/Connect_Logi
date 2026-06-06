import React, { useEffect, useState } from "react";
import axios from "axios";
import CIcon from "@coreui/icons-react";
import freightForwarding from "../src/assets/images/freightforwarder.png";
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

import { Mailing } from "./views/mailing";
import classNames from "classnames";
import API_BASE_URL from "./config/config";

const _nav = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/dashboard",
    icon: (
      <svg
        className="nav-svg-dashboard"
        width="74px"
        height="74px"
        viewBox="0 0 24 24"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        fill="#ffffff"
        stroke="#ffffff"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="#CCCCCC"
          strokeWidth="0.048"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <title>Dashboard</title>
          <g
            id="Dashboard"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            <rect id="Container" x="0" y="0" width="24" height="24"></rect>
            <rect
              id="shape-1"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              x="4"
              y="4"
              width="16"
              height="16"
              rx="2"
            ></rect>
            <line
              x1="4"
              y1="9"
              x2="20"
              y2="9"
              id="shape-2"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
            ></line>
            <line
              x1="9"
              y1="10"
              x2="9"
              y2="20"
              id="shape-3"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
            ></line>
          </g>
        </g>
      </svg>
    ),
  },
  {
    component: CNavItem,
    name: "Organization",
    to: "/organization",
    icon: (
      <svg
        className="nav-svg"
        fill="#ffffff"
        width="64px"
        height="64px"
        viewBox="0 0 32 32"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#ffffff"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path d="M25.469 18h4.531c1.094 0 2 0.906 2 2v10c0 1.094-0.906 2-2 2h-10c-1.094 0-2-0.906-2-2v-10c0-1.094 0.906-2 2-2h3.531v-1.188h-15.094v1.188h3.563c1.094 0 2 0.906 2 2v10c0 1.094-0.906 2-2 2h-10c-1.094 0-2-0.906-2-2v-10c0-1.094 0.906-2 2-2h4.5v-1.875c0-0.688 0.875-1.031 1.656-1.031h6.875v-1.125h-4.313c-1.094 0-2-0.906-2-2v-10c0-1.094 0.906-2 2-2h10c1.094 0 2 0.906 2 2v10c0 1.094-0.906 2-2 2h-3.688v1.156c2.594 0 4.188-0.031 6.781-0.031 0.781 0 1.656 0.313 1.656 1.031v1.875zM30 20h-10v10h10v-10zM20.719 1.969h-10v10h10v-10zM12 20h-10v10h10v-10z"></path>{" "}
        </g>
      </svg>
    ),
  },
  {
    component: CNavItem,
    name: "Approver Log",
    to: "/approverlog",
    icon: (
      <svg
        className="nav-svg-approverlog"
        fill="#ffffff"
        viewBox="0 0 32 32"
        enable-background="new 0 0 32 32"
        version="1.1"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        stroke="#ffffff"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeiLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <g id="Approved"></g> <g id="Approved_1_"></g>{" "}
          <g id="File_Approve"></g> <g id="Folder_Approved"></g>{" "}
          <g id="Security_Approved">
            {" "}
            <g>
              {" "}
              <path d="M26,14c-0.552,0-1,0.448-1,1v7c0,0.286-0.103,7-9,7c-8.838,0-8.998-6.718-9-7V3h18v2c0,0.552,0.448,1,1,1s1-0.448,1-1V2 c0-0.552-0.448-1-1-1H6C5.448,1,5,1.448,5,2v20c0,0.09,0.126,9,11,9s11-8.91,11-9v-7C27,14.448,26.552,14,26,14z"></path>{" "}
              <path d="M27.46,7.946c-0.378-0.404-1.011-0.425-1.413-0.047l-10.004,9.36l-4.629-4.332c-0.403-0.376-1.035-0.356-1.413,0.047 c-0.377,0.403-0.356,1.036,0.047,1.413l5.313,4.971c0.192,0.18,0.438,0.27,0.683,0.27s0.491-0.09,0.683-0.27l10.688-10 C27.817,8.982,27.838,8.349,27.46,7.946z"></path>{" "}
            </g>{" "}
          </g>{" "}
          <g id="Certificate_Approved"></g> <g id="User_Approved"></g>{" "}
          <g id="ID_Card_Approved"></g> <g id="Android_Approved"></g>{" "}
          <g id="Privacy_Approved"></g> <g id="Approved_2_"></g>{" "}
          <g id="Message_Approved"></g> <g id="Upload_Approved"></g>{" "}
          <g id="Download_Approved"></g> <g id="Email_Approved"></g>{" "}
          <g id="Data_Approved"></g>{" "}
        </g>
      </svg>
    ),
    badge: {
      // color: "info",
      text: (
        <span
          style={{
            marginLeft: "40px",
            backgroundColor: "SlateGray",
            fontSize: "14px",
            padding: "4px 9px",
            borderRadius: "10px",
          }}
        >
          {localStorage.getItem("countofremainingrows")}
        </span>
      ),
    },
  },
  {
    component: CNavItem,
    name: "Import",
    to: "/import",
    icon: (
      <svg
        className="nav-svg-import-export"
        fill="#2ca9bc"
        viewBox="0 0 24 24"
        id="import-left"
        data-name="Line Color"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <polyline
            id="secondary"
            points="15 13 11 13 11 9"
            style={{
              fill: "none",
              stroke: "#2ca9bc",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
            }}
          />
          <line
            id="secondary-2"
            data-name="secondary"
            x1="21"
            y1="3"
            x2="11"
            y2="13"
            style={{
              fill: "none",
              stroke: "#BDF2F5",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
            }}
          />
          <path
            id="primary"
            d="M19,13.89V20a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1V6A1,1,0,0,1,4,5h6.11"
            style={{
              fill: "none",
              stroke: "#ffffff",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
            }}
          />
        </g>
      </svg>
    ),
  },
  {
    component: CNavItem,
    name: "Export",
    to: "/export",
    icon: (
      <svg
        className="nav-svg-import-export"
        fill="#2ca9bc"
        viewBox="0 0 24 24"
        id="export"
        data-name="Flat Color"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            id="secondary"
            d="M21,2H17a1,1,0,0,0,0,2h1.59l-8.3,8.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L20,5.41V7a1,1,0,0,0,2,0V3A1,1,0,0,0,21,2Z"
            style={{ fill: "#BDF2F5" }}
          />
          <path
            id="primary"
            d="M18,22H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4h6.11a1,1,0,0,1,0,2H4V20H18V13.89a1,1,0,0,1,2,0V20A2,2,0,0,1,18,22Z"
            style={{ fill: "#ffffff" }}
          />
        </g>
      </svg>
    ),
  },
  {
    component: CNavGroup,
    name: "Accounts",
    icon: (
      <svg
        className="nav-svg-accounts"
        viewBox="0 0 24 24"
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        fill="#ffffff"
        stroke="#ffffff"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <defs>
            <style>
              {`.cls-1{fill:none;stroke:#ffffff;stroke-miterlimit:10;stroke-width:1.91px;}`}
            </style>
          </defs>
          <circle className="cls-1" cx="12" cy="7.25" r="5.73"></circle>
          <path
            className="cls-1"
            d="M1.5,23.48l.37-2.05A10.3,10.3,0,0,1,12,13h0a10.3,10.3,0,0,1,10.13,8.45l.37,2.05"
          ></path>
        </g>
      </svg>
    ),

    items: [
      {
        component: CNavGroup,

        className: "paymentSheet",
        name: "Payment Sheet",
        to: "/PaymentSheet",
        icon: (
          <svg
            className="nav-svg-payment-sheet"
            fill="#ffffff"
            viewBox="0 0 32 32"
            data-name="Layer 1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#ffffff"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <rect height="1" width="10" x="12" y="2"></rect>
              <rect height="1" width="12" x="10" y="29"></rect>
              <rect
                height="1"
                transform="translate(-10.5 23.5) rotate(-90)"
                width="18"
                x="-2.5"
                y="16.5"
              ></rect>
              <rect
                height="1"
                transform="translate(9.5 41.5) rotate(-90)"
                width="20"
                x="15.5"
                y="15.5"
              ></rect>
              <rect
                height="1"
                transform="translate(-1.05 8.18) rotate(-45)"
                width="8.49"
                x="5.11"
                y="4.85"
              ></rect>
              <path d="M22,2V3h2a1,1,0,0,1,1,1V6h1V4a2,2,0,0,0-2-2Z"></path>
              <path d="M22,30V29h2a1,1,0,0,0,1-1V26h1v2a2,2,0,0,1-2,2Z"></path>
              <path d="M10,30V29H8a1,1,0,0,1-1-1V26H6v2a2,2,0,0,0,2,2Z"></path>
              <rect height="1" width="6" x="17" y="7"></rect>
              <rect height="1" width="14" x="9" y="10"></rect>
              <rect height="1" width="14" x="9" y="13"></rect>
              <rect height="1" width="14" x="9" y="16"></rect>
              <rect height="1" width="14" x="9" y="19"></rect>
              <rect height="1" width="14" x="9" y="22"></rect>
              <rect height="1" width="10" x="9" y="25"></rect>
            </g>
          </svg>
        ),
        items: [
          {
            style: { paddingLeft: "90px" },

            to: "/PaymentSheetCredit",
            component: CNavItem,
            name: "Credit",
            icon: (
              <svg
                className="nav-svg-bank"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 18L19 15M19 15L22 18M19 15V21M22 10H2M22 12V8.2C22 7.0799 22 6.51984 21.782 6.09202C21.5903 5.7157 21.2843 5.40974 20.908 5.21799C20.4802 5 19.9201 5 18.8 5H5.2C4.0799 5 3.51984 5 3.09202 5.21799C2.7157 5.40973 2.40973 5.71569 2.21799 6.09202C2 6.51984 2 7.0799 2 8.2V15.8C2 16.9201 2 17.4802 2.21799 17.908C2.40973 18.2843 2.71569 18.5903 3.09202 18.782C3.51984 19 4.0799 19 5.2 19H12"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
          },
          {
            style: { paddingLeft: "90px" },

            to: "/PaymentSheetDebit",
            component: CNavItem,
            name: "Debit",
            icon: (
              <svg
                className="nav-svg-bank"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M16 18L19 21M19 21L22 18M19 21V15M22 10H2M22 12V8.2C22 7.0799 22 6.51984 21.782 6.09202C21.5903 5.7157 21.2843 5.40974 20.908 5.21799C20.4802 5 19.9201 5 18.8 5H5.2C4.0799 5 3.51984 5 3.09202 5.21799C2.7157 5.40973 2.40973 5.71569 2.21799 6.09202C2 6.51984 2 7.0799 2 8.2V15.8C2 16.9201 2 17.4802 2.21799 17.908C2.40973 18.2843 2.71569 18.5903 3.09202 18.782C3.51984 19 4.0799 19 5.2 19H12"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </g>
              </svg>
            ),
          },
        ],
      },
      {
        component: CNavItem,
        style: { paddingLeft: "40px" },

        name: "Bank Details",
        to: "/BankDetails",
        icon: (
          <svg
            className="nav-svg-bank"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#000000"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M3 21.0001H21M4 18.0001H20M6 18.0001V13.0001M10 18.0001V13.0001M14 18.0001V13.0001M18 18.0001V13.0001M12 7.00695L12.0074 7.00022M21 10.0001L14.126 3.88986C13.3737 3.2212 12.9976 2.88688 12.5732 2.75991C12.1992 2.64806 11.8008 2.64806 11.4268 2.75991C11.0024 2.88688 10.6263 3.2212 9.87404 3.88986L3 10.0001H21Z"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        ),
      },
      {
        component: CNavItem,
        style: { paddingLeft: "40px" },

        name: "PayE Details",
        to: "/PayeDetails",
        icon: (
          <svg
            className="nav-svg-bank"
            fill="#ffffff"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 477.297 477.297"
            xmlSpace="preserve"
            stroke="#ffffff"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <g>
                <g>
                  <g>
                    <path d="M42.85,358.075c0-24.138,0-306.758,0-330.917c23.9,0,278.867,0,302.767,0c0,8.542,0,49.44,0,99.722 c5.846-1.079,11.842-1.812,17.99-1.812c3.149,0,6.126,0.647,9.232,0.928V0H15.649v385.233h224.638v-27.158 C158.534,358.075,57.475,358.075,42.85,358.075z"></path>
                    <path d="M81.527,206.842h184.495c1.812-10.16,5.393-19.608,10.095-28.452H81.527V206.842z"></path>
                    <rect
                      x="81.527"
                      y="89.432"
                      width="225.372"
                      height="28.452"
                    ></rect>
                    <path d="M81.527,295.822h191.268c5.112-3.106,10.57-5.63,16.415-7.183c-5.544-6.45-10.095-13.697-13.978-21.269H81.527V295.822z"></path>
                    <path d="M363.629,298.669c41.071,0,74.16-33.197,74.16-74.139c0-40.984-33.09-74.16-74.16-74.16 c-40.898,0-74.009,33.176-74.009,74.16C289.62,265.472,322.731,298.669,363.629,298.669z"></path>
                    <path d="M423.143,310.706H304.288c-21.226,0-38.612,19.457-38.612,43.422v119.33c0,1.316,0.604,2.481,0.69,3.84h194.59 c0.086-1.337,0.69-2.524,0.69-3.84v-119.33C461.733,330.227,444.39,310.706,423.143,310.706z"></path>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        ),
      },
    ],
  },

  {
    component: CNavGroup,
    name: "Admin",
    icon: (
      <svg
        className="nav-svg-admin"
        fill="#ffffff"
        height="200px"
        width="200px"
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 474.565 474.565"
        xmlSpace="preserve"
        stroke="#ffffff"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <g>
            <path d="M255.204,102.3c-0.606-11.321-12.176-9.395-23.465-9.395C240.078,95.126,247.967,98.216,255.204,102.3z"></path>
            <path d="M134.524,73.928c-43.825,0-63.997,55.471-28.963,83.37c11.943-31.89,35.718-54.788,66.886-63.826 C163.921,81.685,150.146,73.928,134.524,73.928z"></path>
            <path d="M43.987,148.617c1.786,5.731,4.1,11.229,6.849,16.438L36.44,179.459c-3.866,3.866-3.866,10.141,0,14.015l25.375,25.383 c1.848,1.848,4.38,2.888,7.019,2.888c2.61,0,5.125-1.04,7.005-2.888l14.38-14.404c2.158,1.142,4.55,1.842,6.785,2.827 c0-0.164-0.016-0.334-0.016-0.498c0-11.771,1.352-22.875,3.759-33.302c-17.362-11.174-28.947-30.57-28.947-52.715 c0-34.592,28.139-62.739,62.723-62.739c23.418,0,43.637,13.037,54.43,32.084c11.523-1.429,22.347-1.429,35.376,1.033 c-1.676-5.07-3.648-10.032-6.118-14.683l14.396-14.411c1.878-1.856,2.918-4.38,2.918-7.004c0-2.625-1.04-5.148-2.918-7.004 l-25.361-25.367c-1.94-1.941-4.472-2.904-7.003-2.904c-2.532,0-5.063,0.963-6.989,2.904l-14.442,14.411 c-5.217-2.764-10.699-5.078-16.444-6.825V9.9c0-5.466-4.411-9.9-9.893-9.9h-35.888c-5.451,0-9.909,4.434-9.909,9.9v20.359 c-5.73,1.747-11.213,4.061-16.446,6.825L75.839,22.689c-1.942-1.941-4.473-2.904-7.005-2.904c-2.531,0-5.077,0.963-7.003,2.896 L36.44,48.048c-1.848,1.864-2.888,4.379-2.888,7.012c0,2.632,1.04,5.148,2.888,7.004l14.396,14.403 c-2.75,5.218-5.063,10.708-6.817,16.438H23.675c-5.482,0-9.909,4.441-9.909,9.915v35.889c0,5.458,4.427,9.908,9.909,9.908H43.987z"></path>
            <path d="M354.871,340.654c15.872-8.705,26.773-25.367,26.773-44.703c0-28.217-22.967-51.168-51.184-51.168 c-9.923,0-19.118,2.966-26.975,7.873c-4.705,18.728-12.113,36.642-21.803,52.202C309.152,310.022,334.357,322.531,354.871,340.654z "></path>
            <path d="M460.782,276.588c0-5.909-4.799-10.693-10.685-10.693H428.14c-1.896-6.189-4.411-12.121-7.393-17.75l15.544-15.544 c2.02-2.004,3.137-4.721,3.137-7.555c0-2.835-1.118-5.553-3.137-7.563l-27.363-27.371c-2.08-2.09-4.829-3.138-7.561-3.138 c-2.734,0-5.467,1.048-7.547,3.138l-15.576,15.552c-5.623-2.982-11.539-5.481-17.751-7.369v-21.958 c0-5.901-4.768-10.685-10.669-10.685H311.11c-2.594,0-4.877,1.04-6.739,2.578c3.26,11.895,5.046,24.793,5.046,38.552 c0,8.735-0.682,17.604-1.956,26.423c7.205-2.656,14.876-4.324,22.999-4.324c36.99,0,67.086,30.089,67.086,67.07 c0,23.637-12.345,44.353-30.872,56.303c13.48,14.784,24.195,32.324,31.168,51.976c1.148,0.396,2.344,0.684,3.54,0.684 c2.733,0,5.467-1.04,7.563-3.13l27.379-27.371c2.004-2.004,3.106-4.721,3.106-7.555s-1.102-5.551-3.106-7.563l-15.576-15.552 c2.982-5.621,5.497-11.555,7.393-17.75h21.957c2.826,0,5.575-1.118,7.563-3.138c2.004-1.996,3.138-4.72,3.138-7.555 L460.782,276.588z"></path>
            <path d="M376.038,413.906c-16.602-48.848-60.471-82.445-111.113-87.018c-16.958,17.958-37.954,29.351-61.731,29.351 c-23.759,0-44.771-11.392-61.713-29.351c-50.672,4.573-94.543,38.17-111.145,87.026l-9.177,27.013 c-2.625,7.773-1.368,16.338,3.416,23.007c4.783,6.671,12.486,10.631,20.685,10.631h315.853c8.215,0,15.918-3.96,20.702-10.631 c4.767-6.669,6.041-15.234,3.4-23.007L376.038,413.906z"></path>
            <path d="M120.842,206.782c0,60.589,36.883,125.603,82.352,125.603c45.487,0,82.368-65.014,82.368-125.603 C285.563,81.188,120.842,80.939,120.842,206.782z"></path>
          </g>
        </g>
      </svg>
    ),

    items: [
      {
        component: CNavGroup,
        name: "User Management",
        icon: (
          <svg
            className="nav-svg-user-management"
            fill="#ffffff"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 60 60"
            xmlSpace="preserve"
            stroke="#ffffff"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <g>
                <g>
                  <path d="M56,11H41V7h2c0.6,0,1-0.4,1-1V2c0-0.6-0.4-1-1-1H17c-0.6,0-1,0.4-1,1v4c0,0.6,0.4,1,1,1h2v4H4c-2.2,0-4,1.8-4,4v15 c0,0.6,0.4,1,1,1h3v27c0,0.6,0.4,1,1,1h33v-2H6V31h14v-2H5H2V15c0-1.1,0.9-2,2-2h16h20h16c1.1,0,2,0.9,2,2v14h-3H40v2h14v2h2v-2h3 c0.6,0,1-0.4,1-1V15C60,12.8,58.2,11,56,11z M18,3h24v2H18V3z M21,11V7h18v4H21z"></path>
                  <path d="M37,26H23c-0.6,0-1,0.4-1,1v6c0,0.6,0.4,1,1,1h14c0.6,0,1-0.4,1-1v-6C38,26.4,37.6,26,37,26z M36,32H24v-4h12V32z"></path>
                  <path d="M59,35H41c-0.6,0-1,0.4-1,1v22c0,0.6,0.4,1,1,1h18c0.6,0,1-0.4,1-1V36C60,35.4,59.6,35,59,35z M58,37v4H42v-4H58z M42,57 V43h16v14H42z"></path>
                  <rect x="45" y="45" width="2" height="2"></rect>
                  <rect x="49" y="45" width="2" height="2"></rect>
                  <rect x="53" y="45" width="2" height="2"></rect>
                  <rect x="45" y="49" width="2" height="2"></rect>
                  <rect x="49" y="49" width="2" height="2"></rect>
                  <rect x="53" y="49" width="2" height="2"></rect>
                  <rect x="45" y="53" width="2" height="2"></rect>
                  <rect x="49" y="53" width="2" height="2"></rect>
                  <rect x="53" y="53" width="2" height="2"></rect>
                  <rect x="43" y="38" width="2" height="2"></rect>
                  <rect x="46" y="38" width="2" height="2"></rect>
                  <rect x="49" y="38" width="2" height="2"></rect>
                  <rect x="52" y="38" width="2" height="2"></rect>
                  <rect x="55" y="38" width="2" height="2"></rect>
                </g>
              </g>
            </g>
          </svg>
        ),
        items: [
          {
            component: CNavItem,
            name: "User List",
            style: { fontSize: "14px", paddingLeft: "72px" },
            to: "/user_report",
            icon: (
              <svg
                className="nav-svg-user"
                fill="#ffffff"
                viewBox="0 0 52 52"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#ffffff"
              >
                <g strokeWidth="0"></g>
                <g strokeLinecap="round" strokeLinejoin="round"></g>
                <g>
                  {/* User icon - head */}
                  <circle cx="18" cy="14" r="8" fill="#ffffff" />

                  {/* User icon - body */}
                  <path d="M18,24 C10,24 4,30 4,36 L4,40 C4,42 6,44 8,44 L28,44 C30,44 32,42 32,40 L32,36 C32,30 26,24 18,24 Z" fill="#ffffff" />

                  {/* Three horizontal lines */}
                  <rect x="37" y="18" width="16" height="3" rx="1.5" fill="#ffffff" />
                  <rect x="37" y="26" width="16" height="3" rx="1.5" fill="#ffffff" />
                  <rect x="37" y="34" width="16" height="3" rx="1.5" fill="#ffffff" />
                </g>
              </svg>
            ),
          },
          {
            component: CNavItem,
            name: "User Role",
            to: "/userroles",
            style: { fontSize: "14px", paddingLeft: "72px" },

            icon: (
              <svg
                className="nav-svg-user"
                fill="#ffffff"
                viewBox="0 0 52 52"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#ffffff"
              >
                <g strokeWidth="0"></g>
                <g strokeLinecap="round" strokeLinejoin="round"></g>
                <g>
                  {/* User icon - head */}
                  <circle cx="18" cy="14" r="8" fill="#ffffff" />

                  {/* User icon - body */}
                  <path d="M18,24 C10,24 4,30 4,36 L4,40 C4,42 6,44 8,44 L28,44 C30,44 32,42 32,40 L32,36 C32,30 26,24 18,24 Z" fill="#ffffff" />

                  {/* Role badge/shield */}
                  <path d="M43,8 L50,8 C51,8 52,9 52,10 L52,20 C52,24 45.5,27 43,29 C38.5,27 34,24 34,20 L34,10 C34,9 35,8 36,8 L43,8 Z" fill="none" stroke="#ffffff" strokeWidth="2" />

                  {/* Checkmark in shield */}
                  <path d="M38,17 L41,20 L48,13" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              </svg>
            ),
          },
        ],
      },

      {
        component: CNavItem,
        name: "Workflow",
        style: { paddingLeft: "35px" },

        to: "/workflow?section=lob",
        icon: (
          <svg
            className="nav-svg-admin"
            fill="#ffffff"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#ffffff"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                fillRule="evenodd"
                d="M1 3a2 2 0 012-2h6.5a2 2 0 012 2v6.5a2 2 0 01-2 2H7v4.063C7 16.355 7.644 17 8.438 17H12.5v-2.5a2 2 0 012-2H21a2 2 0 012 2V21a2 2 0 01-2 2h-6.5a2 2 0 01-2-2v-2.5H8.437A2.938 2.938 0 015.5 15.562V11.5H3a2 2 0 01-2-2V3zm2-.5a.5.5 0 00-.5.5v6.5a.5.5 0 00.5.5h6.5a.5.5 0 00.5-.5V3a.5.5 0 00-.5-.5H3zM14.5 14a.5.5 0 00-.5.5V21a.5.5 0 00.5.5H21a.5.5 0 00.5-.5v-6.5a.5.5 0 00-.5-.5h-6.5z"
              ></path>
            </g>
          </svg>
        ),
      },
      {
        component: CNavItem,
        name: "Changes Request",
        style: { paddingLeft: "35px" },

        to: "/passReq",
        icon: (
          <svg
            className="nav-svg-admin"
            fill="#ffffff"
            viewBox="0 0 52 52"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#ffffff"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M16.4,10h3.2a.77.77,0,0,0,.8-.7V6.8H31.6V9.2a.77.77,0,0,0,.7.8h3.3a.77.77,0,0,0,.8-.7V6.8A4.87,4.87,0,0,0,31.6,2H20.4a4.87,4.87,0,0,0-4.8,4.8V9.2a.79.79,0,0,0,.8.8Z"></path>
              <path d="M45.2,14.8H6.8A4.87,4.87,0,0,0,2,19.6V45.2A4.87,4.87,0,0,0,6.8,50H45.2A4.87,4.87,0,0,0,50,45.2V19.6A4.87,4.87,0,0,0,45.2,14.8ZM23.4,32.9l-6.1,6.3a1.08,1.08,0,0,1-1.1,0L10,32.9c-.5-.4-.1-1.1.7-1.1h3.8A12,12,0,0,1,26.3,19.6h.4v4.6A8.19,8.19,0,0,0,19,31.8h3.6C23.4,31.8,23.8,32.5,23.4,32.9Zm19.4,0H39A12.16,12.16,0,0,1,26.9,45.1h-.3V40.5c4.6,0,7.8-3,7.8-7.6H30.7c-.8,0-1.1-.6-.7-1.1l6.2-6.3a1.08,1.08,0,0,1,1.1,0l6.2,6.3c.4.4,0,1.1-.7,1.1Z"></path>
            </g>
          </svg>
        ),
      },

      {
        component: CNavItem,
        name: "Branch List",
        to: "/branchlist",
        style: { paddingLeft: "35px" },

        icon: (
          <svg
            className="nav-svg-admin"
            fill="#ffffff"
            viewBox="0 0 50 50"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#ffffff"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M15 30c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5zm0-8c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3z"></path>
              <path d="M35 20c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5zm0-8c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3z"></path>
              <path d="M35 40c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5zm0-8c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3z"></path>
              <path d="M19.007 25.885l12.88 6.44-.895 1.788-12.88-6.44z"></path>
              <path d="M30.993 15.885l.894 1.79-12.88 6.438-.894-1.79z"></path>
            </g>
          </svg>
        ),
      },
      {
        component: CNavItem,
        name: "Approvers",
        to: "/approvername",
        style: { paddingLeft: "35px" },

        icon: (
          <svg
            className="nav-svg-admin"
            viewBox="0 0 24 24"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            fill="#ffffff"
            stroke="#ffffff"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <title>ic_fluent_owner_24_regular</title>
              <desc>Created with Sketch.</desc>
              <g
                id="🔍-Product-Icons"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <g
                  id="ic_fluent_owner_24_regular"
                  fill="#ffffff"
                  fillRule="nonzero"
                >
                  <path
                    d="M12,2 C15.8659932,2 19,5.13400675 19,9 C19,10.9069832 18.2374445,12.635862 17.0006263,13.8983435 L16.999195,21.2501919 C16.999195,21.8221078 16.3925938,22.1705743 15.9069572,21.9179868 L15.8174956,21.8634908 L11.9990521,19.175699 L8.18264778,21.8633899 C7.7149893,22.1927369 7.08073725,21.8973024 7.00773756,21.3547285 L7.00080499,21.2501919 L6.99937371,13.8983435 C5.76255555,12.635862 5,10.9069832 5,9 C5,5.13400675 8.13400675,2 12,2 Z M15.499195,19.805098 L15.4994158,15.0638626 C14.469941,15.6592489 13.2747638,16 12,16 C10.7252362,16 9.53005898,15.6592489 8.50058424,15.0638626 L8.50080499,19.8046848 L11.5671021,17.6452546 C11.7936845,17.4856846 12.086605,17.4657075 12.3298005,17.5853366 L12.4306444,17.6451536 L15.499195,19.805098 L15.4994158,15.0638626 L15.499195,19.805098 Z M12,3.5 C8.96243388,3.5 6.5,5.96243388 6.5,9 C6.5,12.0375661 8.96243388,14.5 12,14.5 C15.0375661,14.5 17.5,12.0375661 17.5,9 C17.5,5.96243388 15.0375661,3.5 12,3.5 Z"
                    id="🎨-Color"
                  >
                    {" "}
                  </path>
                </g>
              </g>
            </g>
          </svg>
        ),
      },
      {
        component: CNavItem,
        name: "EditLogs",
        style: { paddingLeft: "35px" },

        to: "/EditLogs",
        icon: (
          <svg
            className="nav-svg-admin"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M4 3a1 1 0 011-1h10l5 5v12a1 1 0 01-1 1H4a1 1 0 01-1-1V3z"
                strokeLinejoin="round"
              ></path>
              <path d="M14 2v6h6" strokeLinejoin="round"></path>
              <path
                d="M12.5 13.5l1 1a1 1 0 010 1.414L9 20H7v-2l4.5-4.5a1 1 0 011.414 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
        ),
      },
    ],
  },

  //Recycle Bin
  {
    component: CNavItem,
    name: "Recycle Bin",
    to: "/recyclebin",
    icon: (
      <svg
        className="nav-svg-recyclebin"
        fill="#ffffff"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M8 3a1 1 0 011-1h6a1 1 0 011 1v2h4a1 1 0 110 2h-1v13a3 3 0 01-3 3H8a3 3 0 01-3-3V7H4a1 1 0 110-2h4V3zm2 2h4V4h-4v1zm-3 3v12a1 1 0 001 1h8a1 1 0 001-1V8H7zm3 2a1 1 0 011 1v6a1 1 0 11-2 0v-6a1 1 0 011-1zm4 0a1 1 0 011 1v6a1 1 0 11-2 0v-6a1 1 0 011-1z" />
      </svg>
    ),
  },
  {
    component: CNavItem,
    name: "Delegation",
    to: "/delegations",
    icon: (
      <svg
        className="nav-svg-recyclebin"
        fill="#ffffff"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#ffffff"
        stroke-width="1.28"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <title></title>{" "}
          <g data-name="Layer 38" id="Layer_38">
            {" "}
            <path d="M53,43V33H33V25H43V3H21V25H31v8H11V43H3V61H21V43H13V35H31v8H23V61H41V43H33V35H51v8H43V61H61V43ZM23,23V5H41V23H23ZM19,45V59H5V45Zm20,0V59H25V45H39ZM59,59H45V45H59Z"></path>{" "}
          </g>{" "}
        </g>
      </svg>
    ),
  },

  //Chat Space
  {
    component: CNavItem,
    name: "Connect Space",
    to: "/connectSpace",
    icon: (
      <svg
        className="nav-svg-chat"
        fill="#ffffff"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#ffffff"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 2.98.97 4.29L1 23l6.71-1.97C9.02 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.25 0-2.45-.2-3.57-.57l-.35-.14-3.69 1.08 1.08-3.69-.14-.35C4.2 14.45 4 13.25 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z" />
        </g>
      </svg>
    ),
    badge: {
      text: (
        <span
          style={{
            marginLeft: "20px",
            backgroundColor: "slategray",
            fontSize: "14px",
            padding: "4px 9px",
            borderRadius: "10px",
            color: "#ffffff"
          }}
        >
          {localStorage.getItem("unreadMessages") || "0"}
        </span>
      ),
    },
  },

];

const useVisibleNav = () => {
  const [allowedSections, setAllowedSections] = useState([]);
  const [hasApprover, setHasApprover] = useState(false);
  const [hasDeleteControl, setHasDeleteControl] = useState(false);
  const username = localStorage.getItem("username");

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/fetchNavSections`, {
        params: {
          username,
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
          branchname: localStorage.getItem("branchnameofemp"),
          branchcode: localStorage.getItem("branchcodeofemp"),
        },
      })
      .then((resp) => {
        setAllowedSections(resp.data.sections); // array of lowercased names
        console.log("section", resp.data.sections);
        setHasApprover(resp.data.approvers.length > 0); // true if any approver rows
        setHasDeleteControl(resp.data.deletecontrols.length > 0); // true if any delete controls
      })
      .catch(() => {
        setAllowedSections([]);
        setHasApprover(false);
        setHasDeleteControl(false);
      });
  }, []);

  if (allowedSections == null) return []; // still loading

  if (username === "admin") return _nav;

  return _nav.filter((item) => {
    const name = item.name.toLowerCase();
    if (item.name === "Dashboard") return true;
    if (item.name === "Connect Space") return true;
    if (item.name === "Delegation") return true;
    // show if this section is explicitly allowed…
    if (allowedSections.includes(name)) return true;
    // …or if it's the Approver Log and we have at least one approver entry
    if (item.name === "Approver Log" && hasApprover) return true;
    if (item.name === "Recycle Bin" && hasDeleteControl) return true;
    return false;
  });
};

export { useVisibleNav };
