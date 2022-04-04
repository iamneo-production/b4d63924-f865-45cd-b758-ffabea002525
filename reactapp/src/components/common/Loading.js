import React from "react";
import "../../index.css";
const Loading = (props) => {
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        gap: "0px",
      }}
    >
      {/* <img
        src="/trainLogo.png"
        alt="trainLogo"
        className="rotate"
        style={{ height: 55, width: 55, position: "relative", top: "50px" }}
      /> */}
      <img src="/loading.svg" alt="Loading" />
    </div>
  );
};
export default Loading;
