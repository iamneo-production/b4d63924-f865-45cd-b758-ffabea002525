import React, { useState, useEffect, useContext } from "react";
import Navbar from "./Navbar";
import "../../index.css";
import Traincard from "./Traincard";
import Searchcomponent from "./Searchcomponent";
import { RailContext } from "../context/context";
import Loading from "../Loading";

const Dashboard = () => {
  const { trainData } = useContext(RailContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          <div
            id="dashBoard"
            className="container-fluid bg-user-dashboard py-3"
          >
            <Searchcomponent />
            <div className="row">
              {trainData.map((trainItem) => {
                return <Traincard key={trainItem.id} trainItem={trainItem} />;
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
