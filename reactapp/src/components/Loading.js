import React from "react";

const Loading = () => {
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
      }}
    >
      <img src="/loading.svg" alt="Loading" />
    </div>
  );
};

export default Loading;
