import React,{useState,useEffect} from 'react'
import traindata  from './Train';
import Passanger from '../user_components/Passanger';
const RailContext=React.createContext();

 

const RailProvider=({children})=>{
    
    const[trainData,setTrainData]=useState(traindata);
    const[login,setLogin]=useState({
        loginEmail:"",
        loginPassword:""
    })
    const[currentId,setCurrentId]=useState("");
    const[loading,setLoading]=useState(true)
    const[vehicleData,setVehicleData]=useState(null);
    const[person,setPerson]=useState(0);
    const[personRows,setPersonRows]=useState([]);
    const[signup,setSignup]=useState({
        userType:"",
        userSignupemail:"",
        usernameSignup:"",
        mobileSignup:"",
        passwordsignup:"",
        cpassword:""


    })

   

    const loginHandle=(e)=>{
        const name=e.target.name;
        const val=e.target.value
        setLogin({...login,[name]:val});
    }

    const handleRowsPerson=()=>{
        
        console.log("hello")
        if(person==0){
            setPersonRows([]);
            
        }else if(person==1){
            setPersonRows([<Passanger key={1} />]);
            
        }else if(person==2){
            setPersonRows([<Passanger key={1} />,<Passanger key={2} />]);
            
        }else if(person==3){
            setPersonRows([<Passanger key={1} />,<Passanger key={2} />,<Passanger key={3} />]);
            
        }else if(person==4){
            setPersonRows([<Passanger key={1} />,<Passanger key={2} />,<Passanger key={3} />,<Passanger key={4} />]);
           
        }else{
            setPersonRows([<Passanger key={1} />,<Passanger key={2} />,<Passanger key={3} />,<Passanger key={4} />,<Passanger key={5} />])
            
        }
        
    }

    const signupHandle=(e)=>{
        const name=e.target.name;
        const val=e.target.value
        setSignup({...signup,[name]:val});
    }

    const TrainPassangerHandle=(id)=>{
        setCurrentId(id);
        
    }

    const handlePerson=(e)=>{
        if(e.target.value>=0 && e.target.value<=5){
            setPerson(e.target.value)
        }
        
    }

    const filterData=()=>{
       
        const data=trainData.filter((data)=>data.id===currentId);
        const datatemp=data[0];
        setVehicleData(datatemp);
        
    }

    useEffect(()=>{
        filterData();
        setPerson(0);
    },[currentId])

    useEffect(()=>{
        handleRowsPerson();
    },[person])


    return <RailContext.Provider value={{trainData,vehicleData,login,currentId,person,personRows,handleRowsPerson,handlePerson,loginHandle,signup,signupHandle,TrainPassangerHandle}}>
        {children}
    </RailContext.Provider>
}



export {RailContext,RailProvider};
