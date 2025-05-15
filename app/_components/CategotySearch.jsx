'use client'
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import GlobalApi from '../_utils/GlobalApi'
import Image from "next/image"
import Link from 'next/link'

function CategotySearch() {
  const [categoryList, setCategoryList] = useState([])

  useEffect(() => {
    getCategoryList()
  }, [])

  const getCategoryList = () => {
    GlobalApi.getCategory().then(resp => {
      console.log(resp.data.data)
      setCategoryList(resp.data.data)
    })
  }

  return (
    <div className='mt-10 items-center flex flex-col gap-4'>
      <h2 className='font-bold text-4xl tracking-wide text-[#33b9cb]'>
        Search <span className='text-primary'>Doctor</span>
      </h2>
      <h2 className='text-primary text-xl font-semibold'>
        Search Your <span className='text-[#33b9cb]'>Doctor and Book Appointment</span> in one click
      </h2>

        <div className="flex w-full mt-3 max-w-sm items-center space-x-2">
    <Input type="text" placeholder="Search..." />
  
      <Button
        type="submit"
        className="relative overflow-hidden px-4 py-2 bg-[#33b9cb] text-white font-semibold group flex items-center"
      >
        <span className="relative z-10 flex items-center transition duration-300">
          <Search className="h-4 w-4 mr-2" />
          Search
        </span>
        <span className="absolute inset-0 w-0 group-hover:w-full bg-primary transition-all duration-500 ease-out"></span>
      </Button>
    </div>


    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">

  {categoryList.length>0 ?categoryList.map((item, index) => {
    const iconData = item.attributes?.Icon?.data?.[0];
    const imageUrl = iconData?.attributes?.url
      ? iconData.attributes.url.startsWith("http")
        ? iconData.attributes.url
        : `http://localhost:1337${iconData.attributes.url}`
      : null;

    return (
      <Link href={'/search/'+item?.attributes?.Name}
        key={index}
        className="relative bg-white rounded-xl  p-6 transition-all duration-300 hover: shadow-lg group "
      >
      
        <div className="absolute bottom-0 right-0 w-5 h-5 bg-[#33b9cb] rounded-tl-[1rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* ไอคอน */}
        <div className="flex items-center gap-1 mb-4 ">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-lg">
            {imageUrl ? (
              <Image src={imageUrl} alt="icon" width={25} height={25} />
            ) : (
              "+"
            )}
          </div>

         
          <div className="w-0 h-0 border-l-[8px] border-l-[#152847] border-y-[8px] border-y-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>


        <h3 className="text-[#152847] font-bold text-lg leading-snug">
          {item.attributes?.Name}
        </h3>

      </Link>
    );
  })
  :
  [1, 2, 3, 4, 5, 6].map((item, index) => (
    <div
      key={index}
      className="relative bg-white rounded-xl p-6 transition-all duration-300 hover:shadow-lg group max-w-md mx-auto"
    >
      {/* Skeleton Loading */}
      <div className="animate-pulse">
        <div className="bg-gray-300 h-16 w-16 rounded-full mb-4"></div> 
        <div className="bg-gray-300 h-8 w-1/2 mb-2"></div> 
       
      </div>
    </div>
  ))
  
  
  
  
}
</div>














    </div>
  )
}

export default CategotySearch
