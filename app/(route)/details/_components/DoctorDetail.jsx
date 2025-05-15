import { Button } from '@/components/ui/button';
import { GraduationCap, MapPin } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import BookAppointment from './BookAppointment';

function DoctorDetail({ doctor }) {
  const socialMediaList = [
    {
      id: 1,
      icon: '/youtube.png',
    },
    {
      id: 2,
      icon: '/facebook.png',
    },
    {
      id: 3,
      icon: '/instagram.png',
    },
    {
      id: 4,
      icon: '/twitter.png',
    }
  ];

  const imageData = doctor.attributes?.image?.data?.[0];
  const imageUrl = imageData?.attributes?.url;
  const fullImageUrl = imageUrl?.startsWith('http')
    ? imageUrl
    : imageUrl
    ? `http://localhost:1337${imageUrl}`
    : null;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-6 mt-5 p-5 rounded-lg">
        {/* Doctor Image */}
        <div className="flex justify-center items-center mb-4 md:mb-0">
          <Image
            src={fullImageUrl}
            width={200}
            height={200}
            quality={100}
            alt="doctor"
            className="rounded-lg bg-[#33b9cb] shadow-2xl"
          />
        </div>

        {/* Doctor Information */}
        <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
          <h2 className="font-bold text-2xl text-[#33b9cb] hover:text-primary cursor-pointer">
            {doctor?.attributes?.Name}
          </h2>

          <h2 className="flex items-center gap-2 text-gray-500 font-semibold">
            <GraduationCap />
            <span>{doctor.attributes?.Year_of_Experience} Years of Experience</span>
          </h2>

          <h2 className="flex items-center gap-2 text-gray-700 text-md font-bold">
            <MapPin />
            <span>{doctor.attributes?.Address}</span>
          </h2>

          {/* Category Tag */}
          <h2 className="text-xs font-semibold text-[#152847] bg-[#8be8f4] px-3 py-1 rounded-full w-fit shadow-sm">
            {doctor.attributes?.categories.data?.[0]?.attributes?.Name || 'Specialist'}
          </h2>

          {/* Social Media Icons */}
          <div className="flex gap-3">
            {socialMediaList.map((item, index) => (
              <Image
                key={index}
                src={item.icon}
                width={30}
                height={30}
                alt="social-media-icon"
                className="hover:scale-110 transition-all cursor-pointer"
              />
            ))}
          </div>

         
          
          <BookAppointment doctor={doctor}/>
        </div>
      </div>

      {/* About Me Section */}
      <div className="p-3 border-[1px] rounded-lg mt-5">
        <h2 className="text-[#33b9cb] font-bold">
          About <span className="text-primary font-bold text-shadow-4xl">Me</span>
        </h2>
        <p className="text-gray-600 tracking-wider mt-2 text-md font-semibold">
          {doctor.attributes.About}
        </p>
      </div>
    </>
  );
}

export default DoctorDetail;
