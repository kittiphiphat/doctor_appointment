'use client';

import GlobalApi from '@/app/_utils/GlobalApi';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

function SuggestionCard({ doctor }) {
  const imageData = doctor.attributes?.image?.data?.[0];
  const imageUrl = imageData?.attributes?.url;
  const fullImageUrl = imageUrl?.startsWith('http')
    ? imageUrl
    : imageUrl
    ? `http://localhost:1337${imageUrl}`
    : null;

  return (
    <div className="flex items-center gap-3 p-3 bg-white  dark:bg-gray-800 dark:hover:bg-gray-700 rounded-xl shadow-sm transition cursor-pointer">
      {fullImageUrl ? (
        <Image
          src={fullImageUrl}
          alt="doctor"
          width={50}
          height={50}
          className="rounded-full object-cover"
        />
      ) : (
        <div className="w-[50px] h-[50px] rounded-full bg-gray-300 animate-pulse" />
      )}

      <div className="flex flex-col text-left">

        <span className=" inline-block text-sm font-semibold text-[#152847] bg-[#8be8f4] w-full px-2 py-1 rounded-full  shadow-sm mb-3 text-center">
            {doctor.attributes?.categories?.data?.[0]?.attributes?.Name || 'Specialist'}
        </span>


        <h3 className="text-xs font-extrabold px-2 text-[#152847] mb-1 ">
            {doctor.attributes?.Name}
        </h3>
  
        <p className="text-xs font-bold text-[#02a1b6] px-3 shadow-text-2xl whitespace-nowrap">
            {doctor.attributes?.Year_of_Experience || '0'} 
        </p>

        {doctor.attributes?.Speciality && (
          <span className="mt-1 inline-block bg-[#8be8f4] text-primary dark:bg-[#8be8f4] dark:text-primary text-[10px] px-2 py-0.5 rounded-full w-fit">
            {doctor.attributes.Speciality}
          </span>
        )}
      </div>
    </div>
  );
}

function DoctorDetails() {
  const [doctorList, setDoctorList] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const itemsPerPage = 5;

  useEffect(() => {
    getDoctorList();
  }, []);

  const getDoctorList = () => {
    GlobalApi.getDoctorList()
      .then((resp) => {
        setDoctorList(resp.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching doctors:", err);
        setError('ไม่สามารถโหลดรายชื่อหมอได้');
        setLoading(false);
      });
  };

  const handleNext = () => {
    if (startIndex + itemsPerPage < doctorList.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  if (loading) return <div className="p-6 text-center text-gray-500">กำลังโหลด...</div>;
  if (error) return <div className="p-6 text-red-500 text-center">{error}</div>;

  return (
    <div className="flex p-4 mt-5">
      <div className="w-full bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-2xl shadow-lg p-5 sticky top-6">
        <h2 className="mb-4 font-bold text-lg text-gray-800 dark:text-white">Suggestions</h2>

        <div className="flex flex-col gap-3">
          {doctorList.slice(startIndex, startIndex + itemsPerPage).map((doctor, index) => (
            <Link key={index} href={`/details/${doctor.id}`}>
              <SuggestionCard doctor={doctor} />
            </Link>
          ))}
        </div>

        {/* ปุ่มเลื่อน */}
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            className="text-sm px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white disabled:opacity-40"
          >
            ← Before
          </button>
          <button
            onClick={handleNext}
            disabled={startIndex + itemsPerPage >= doctorList.length}
            className="text-sm px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

export default DoctorDetails;
