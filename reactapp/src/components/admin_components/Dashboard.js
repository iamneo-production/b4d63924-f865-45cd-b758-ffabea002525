import React, { useState, useEffect, useContext } from "react";
import Navbar from "./Navbar";
import "../../index.css";
import Traincard from "./Traincard";
import Searchcomponent from "./Searchcomponent";
import { RailContext } from "../context/context";
import Loading from "../Loading";
import { getAllVehicles } from "../../api/api";

const Dashboard = () => {
  const [trainData, setTrainData] = useState([]);
  const { setAllVehicleList } = useContext(RailContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 2000);
    async function fetchData() {
      const response = await getAllVehicles("admin");
      console.log(response);
      if (response?.status === 200) {
        setTrainData(response.data);
        setAllVehicleList(response.data);
      }
      setIsLoading(false);
    }
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
            {trainData.length === 0 && (
              <div>
                <p>No Trains Available</p>
              </div>
            )}
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
