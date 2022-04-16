import React from "react";

export default function EmptyState() {
  return (
    <div
      className="container py-2"
      style={{
        boxShadow: "0px 15px 16.83px 0.17px rgb(0 0 0 / 5%)",
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        borderRadius: 12,
        marginTop: 25,
        flexDirection: "column",
        width: "80%",
      }}
    >
      <img src="/noDataFound.png" alt="noData" />
      <h3>No Data Found</h3>
    </div>
  );
}
