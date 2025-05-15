'use client';

import DoctorList from '@/app/_components/DoctorList';
import GlobalApi from '@/app/_utils/GlobalApi';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';  

function Search() {
  const { cname } = useParams();  
  const [doctorList, setDoctorList] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    if (cname) {
      getDoctors(cname);
    } else {
      setLoading(false);  
    }
  }, [cname]);

  const getDoctors = (category) => {
    setLoading(true);  
    GlobalApi.getDoctorByCategory(category)
      .then(resp => {
        setDoctorList(resp.data.data);
        setLoading(false); 
      })
      .catch(err => {
        console.error("Error fetching doctors:", err);
        setLoading(false);  
      });
  };

  return (
       <div className="mx-auto px-4 sm:px-4 lg:px-2 2xl:px-10  ">
        <DoctorList heading={cname} doctorList={doctorList} />
      </div>

  );
}

export default Search;

