import React from "react";
import styles from "./css/NewButton.module.css";

function NewButton({ text, width, value , height , bgcolor }) {
  return (
    <button
      disabled={text === "Delete" ? (value === "" ? true : false) : false}
      className={(text === "Close" || text === "Cancel" || text === "-") ? styles.close : styles.span}
      style={{ width: width , height: height ? height : "35px",
        fontSize: (text === "+" || text === "-")? "larger": styles.close,
       }}
    >
      {text}
    </button>
  );
}

export default NewButton;
