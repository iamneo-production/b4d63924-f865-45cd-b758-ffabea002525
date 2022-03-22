import React, { useState, useEffect } from "react";
import traindata from "./Train";
import Passanger from "../user_components/Passanger";
const RailContext = React.createContext();

const RailProvider = ({ children }) => {
  const [trainData, setTrainData] = useState(traindata);
  const [login, setLogin] = useState({
    loginEmail: "",
    loginPassword: "",
  });
  const [user, setUser] = useState({
    userType: "admin",
    email: "",
    firstName: "",
    lastName: "",
    mobilenumber: "",
    age: "",
    gender: "",
    loggedIn: false,
    token: "",
  });
  const [currentId, setCurrentId] = useState("");
  const [loading, setLoading] = useState(true);
  const [vehicleData, setVehicleData] = useState(null);
  const [person, setPerson] = useState(0);

  const [signup, setSignup] = useState({
    userType: "",
    userSignupemail: "",
    usernameSignup: "",
    mobileSignup: "",
    passwordsignup: "",
    cpassword: "",
  });
  const [singlePassanger, setSinglePassanger] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
  });
  const [passangerDetails, setPassangerDetails] = useState([]);

  const loginHandle = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    setLogin({ ...login, [name]: val });
  };

  const signupHandle = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    setSignup({ ...signup, [name]: val });
  };

  const SinglePassangerDetail = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    setSinglePassanger({ ...singlePassanger, [name]: val });
  };

  const MultiplePassangerDetail = () => {
    setPassangerDetails([...passangerDetails, singlePassanger]);
    setSinglePassanger({ firstName: "", lastName: "", age: "", gender: "" });
  };

  const TrainPassangerHandle = (id) => {
    setCurrentId(id);
  };

  const handlePerson = (e) => {
    if (e.target.value >= 0 && e.target.value <= 5) {
      setPerson(e.target.value);
    }
  };

  const filterData = () => {
    const data = trainData.filter((data) => data.id === currentId);
    const datatemp = data[0];
    setVehicleData(datatemp);
  };

  useEffect(() => {
    filterData();
    setPerson(0);
  }, [currentId]);

  return (
    <RailContext.Provider
      value={{
        trainData,
        vehicleData,
        login,
        currentId,
        person,
        singlePassanger,
        passangerDetails,
        MultiplePassangerDetail,
        handlePerson,
        loginHandle,
        signup,
        signupHandle,
        TrainPassangerHandle,
        SinglePassangerDetail,
        user,
        setUser,
      }}
    >
      {children}
    </RailContext.Provider>
  );
};

export { RailContext, RailProvider };
