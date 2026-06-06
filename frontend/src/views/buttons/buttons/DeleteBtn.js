import React from "react";
import styles from "./css/svgs.module.css";

function DeleteBtn({ fill }) {
  return (
    <div className="delete-hover-color">
      <svg
        width="16"
        height= "16"
        viewBox="0 0 1024 1024"
        // className={styles.svg} // Set fill to none to allow stroke color to show
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        style={{backgroundColor: "transparent !important"}}
        fill = {fill}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path d="M32 241.6c-11.2 0-20-8.8-20-20s8.8-20 20-20l940 1.6c11.2 0 20 8.8 20 20s-8.8 20-20 20L32 241.6zM186.4 282.4c0-11.2 8.8-20 20-20s20 8.8 20 20v688.8l585.6-6.4V289.6c0-11.2 8.8-20 20-20s20 8.8 20 20v716.8l-666.4 7.2V282.4z">
          </path>
          <path d="M682.4 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM367.2 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM524.8 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM655.2 213.6v-48.8c0-17.6-14.4-32-32-32H418.4c-18.4 0-32 14.4-32 32.8V208h-40v-42.4c0-40 32.8-72.8 72.8-72.8H624c40 0 72.8 32.8 72.8 72.8v48.8h-41.6z">
          </path>
        </g>
      </svg>
      <style>
        {`
          .delete-hover-color {
            display: inline-block; /* Ensure the div wraps the SVG */
          }

          .delete-hover-color svg {
            transition: fill 0.2s ease-in-out; /* Smooth transition for fill color */
          }

          .delete-hover-color:hover svg path {
            fill: red; /* Change the SVG path fill color on hover */
          }
        `}
      </style>
    </div>
  );
}

export default DeleteBtn;
