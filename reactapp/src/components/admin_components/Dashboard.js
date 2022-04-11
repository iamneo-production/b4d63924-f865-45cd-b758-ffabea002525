import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "../../index.css";
import Traincard from "../common/Traincard";
import Searchcomponent from "../common/Searchcomponent";
import Loading from "../common/Loading";
import { getAllVehicles } from "../../api/api";
import { useNavigate } from "react-router-dom";
import EmptyState from "../common/EmptyState";

const Dashboard = () => {
  const [trainData, setTrainData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allVehicleList, setAllVehicleList] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 2000);
    async function fetchData() {
      const response = await getAllVehicles("admin");
      if (response?.status === 200) {
        setTrainData(response.data);
        setAllVehicleList(response.data);
      }
      setIsLoading(false);
    }
  }, []);

  const updateInput = async (input) => {
    if (input === null || input === undefined || input === "") {
      setTrainData(allVehicleList);
      setInput(input);
      return;
    }
    const filtered = allVehicleList.filter((item) => {
      return (
        item.name.toLowerCase().includes(input.toLowerCase()) ||
        item.address.toLowerCase().includes(input.toLowerCase())
      );
    });
    setInput(input);
    setTrainData(filtered);
  };

  const navigateToBooking = (id) => {
    navigate(`/admin/editvehicle/${id}`);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          <div id="dashBoard" className="container bg-user-dashboard py-3">
            <Searchcomponent value={input} onChange={updateInput} />
            {trainData.length === 0 && <EmptyState />}
            <div className="row">
              {trainData.map((trainItem, index) => {
                return (
                  <Traincard
                    key={trainItem.id}
                    trainItem={trainItem}
                    navigateToBooking={navigateToBooking}
                    isAdmin
                    index={index}
                  />
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
