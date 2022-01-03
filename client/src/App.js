import axios from "axios";
import {useEffect} from "react";
import "./App.css";

export default function App(){
  const callApi = async ()=>{
    axios.get("/api").then((res)=>console.log(res.data.test));
  };

  useEffect(()=>{
    callApi();
  }, []);

  return <div> test </div>;
}