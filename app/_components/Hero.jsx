import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

function Hero() {
  return (
    <div>
        <section className="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2 shoadow-xl">
  <div className="p-8 md:p-12 lg:px-16 lg:py-24">
    <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
      <h2 className="text-2xl font-bold text-primary md:text-3xl">
         Find & Book <span className='text-[#33b9cb]'>AppointMent </span>with your Fav <span className='text-[#33b9cb]'>Doctor</span>
      </h2>

      <p className="hidden text-primary md:mt-4 md:block">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, egestas tempus tellus etiam
        sed. Quam a scelerisque amet ullamcorper eu enim et fermentum, augue. Aliquet amet volutpat
        quisque ut interdum tincidunt duis.
      </p>

      <div className="mt-4 md:mt-8">
       <Button className="relative overflow-hidden px-6 py-3 bg-[#33b9cb] text-white font-semibold group">
          <span className="relative z-10  transition duration-300">Explore Now</span>
          <span className="absolute inset-0 w-0 group-hover:w-full bg-primary transition-all duration-500 ease-out"></span>
        </Button>

      </div>
    </div>
  </div>

  <Image
    alt=""
    src="/doctors.jpg"
    width={800}
    height={800}
    className="h-56 w-full object-cover sm:h-full rounded-l-full"
  />
</section>
    </div>
  )
} 

export default Hero