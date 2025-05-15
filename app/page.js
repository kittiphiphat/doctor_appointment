'use client'
import { useEffect, useState } from "react";
import Hero from "./_components/Hero";
import CategotySearch from "./_components/CategotySearch";
import DoctorList from "./_components/DoctorList";
import GlobalApi from "./_utils/GlobalApi";
import Footer from "./_components/Footer";

export default function Home() {


  const [doctorList,setDoctorList] = useState([]);
  useEffect(() => {
    getDoctorList()
  
    
  }, [])
  

  const getDoctorList= () =>{
    GlobalApi.getDoctorList().then(resp=>{
      console.log (resp.data.data);
      setDoctorList(resp.data.data);
    })
  }
  return (
      <div>
        <Hero/>

        <CategotySearch/>

        <DoctorList doctorList={doctorList}/>


      </div>
  );
}
