import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DoctorList({ doctorList, heading = "Popular Doctors" }) {
  return (
    <section className="max-w-screen-2xl mx-auto mt-10 px-4 sm:px-4 lg:px-2 font-sans">
      <h2 className="text-xl sm:text-2xl font-extrabold mb-6">
        <span className="text-[#33b9cb] mr-2">{heading.split(' ')[0]}</span>
        <span className="text-[#152847]">{heading.split(' ')[1]}</span>
      </h2>

      {/* Grid Layout */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mt-8 place-items-center">
        {doctorList && doctorList.length > 0 ? (
          doctorList
            .sort(
              (a, b) =>
                parseInt(b.attributes?.Year_of_Experience || 0) - parseInt(a.attributes?.Year_of_Experience || 0)
            )
            .slice(0, 5) // Show top 5 doctors based on experience
            .map((doctor, index) => {
              const imageData = doctor.attributes?.image?.data?.[0];
              const imageUrl = imageData?.attributes?.url;
              const fullImageUrl = imageUrl?.startsWith('http')
                ? imageUrl
                : imageUrl
                ? `http://localhost:1337${imageUrl}`
                : null;

              return (
                <div
                  key={index}
                  className="w-full bg-white border border-gray-200 rounded-xl shadow-lg p-6 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl min-h-[420px]"
                >
                  {/* Image */}
                  {fullImageUrl ? (
                    <Image
                      src={fullImageUrl}
                      width={144}
                      height={144}
                      quality={100}
                      alt="doctor"
                      className="w-36 h-36 object-cover rounded-full mb-4 transition-transform duration-300 hover:scale-110"
                    />
                  ) : (
                    <div className="w-36 h-36 bg-gray-200 animate-pulse rounded-full mb-4" />
                  )}

                  {/* Category Tag */}
                  <span className="inline-block text-xs font-semibold text-[#152847] bg-[#8be8f4] px-4 py-1 rounded-full shadow-sm mb-3">
                    {doctor.attributes?.categories?.data?.[0]?.attributes?.Name || 'Specialist'}
                  </span>

                  {/* Name */}
                  <h3 className="text-[16px] font-extrabold text-[#152847] mb-1 whitespace-nowrap">
                    {doctor.attributes?.Name}
                  </h3>

                  {/* Experience */}
                  <p className="text-[15px] font-bold text-[#152847] whitespace-nowrap">
                    {doctor.attributes?.Year_of_Experience || '0'} 
                  </p>

                  {/* Address */}
                  <p className="text-[13px] text-[#152847] mt-1 font-medium line-clamp-2 overflow-hidden text-ellipsis">
                    {doctor.attributes?.Address || 'No address provided'}
                  </p>

                  {/* Book Now Button */}
                  <Link href={`/details/${doctor?.id}`} passHref>
                    <Button className="relative overflow-hidden w-full px-6 py-3 mt-2 text-white font-semibold group cursor-pointer">
                      <span className="relative z-10 transition duration-300">Book Now</span>
                      <span className="absolute inset-0 w-0 group-hover:w-full bg-[#33b9cb] transition-all duration-500 ease-out"></span>
                    </Button>
                  </Link>
                </div>
              );
            })
        ) : (
          // Skeleton Loader
          Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="w-full bg-white border border-gray-200 rounded-xl shadow-sm p-6 animate-pulse flex flex-col items-center min-h-[420px]"
            >
              <div className="w-24 h-24 bg-gray-300 rounded-full mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
