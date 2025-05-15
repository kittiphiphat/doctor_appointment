'use client';
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import React, { useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {LogoutLink,LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"

function Header() {
    const Menu=[
        {
            id:1,
            name:"Home",
            path:'/'
        },
        {
            id:2,
            name:"Explore",
            path:'/explore'
        },

        {
            id:3,
            name:"Contact Us",
            path:'/contact'
        },
    ]

    const  {user} = useKindeBrowserClient();

        useEffect (()=>{
            console.log(user);
        },[user])

  return (
    <div className='flex items-center justify-between p-4 shadow-sm font-bold'>
        <div className='flex items-center gap-10'>
            <Link href={'/'}><Image src={'/logo.svg'} alt='logo' width={180} height={80}/></Link>

            <ul className='md:flex gap-8 hidden'>
                {Menu.map((item,index)=>(
                    <Link href={item.path}  key={index}  > <li className='hover:text-primary cursor-pointer 
                    hover:scale-105 transition-all ease-in-out text-[#33b9cb]'>{item.name}</li>
                    </Link>
                   
                ))}
            </ul>
        </div>
        <div>
            {user? 
                
                <Popover>
                    <PopoverTrigger>
                        <Image src= {user?.picture} alt="profile-image" width={50} height={50} className="rounded-full"/>
                    </PopoverTrigger>
                    <PopoverContent>
                        <ul className=" flex flex-col gap-2 font-semibold">
                            <li className="cursor-pointer p-2 hover:bg-primary hover:text-[#33b9cb] rounded-md">Profile</li>
                            <li  className="cursor-pointer p-2 hover:bg-primary hover:text-[#33b9cb] rounded-md">MY Booking</li>
                                < LogoutLink className="cursor-pointer p-2 hover:bg-primary hover:text-[#33b9cb] rounded-md">Logout</LogoutLink>
                        </ul>
                    </PopoverContent>
                </Popover>
                // <LogoutLink><Button>Log out</Button></LogoutLink> 
                :
                <LoginLink>
                    <Button className="relative overflow-hidden px-3 mx-1 py-3 bg-[#33b9cb] text-white font-semibold group">
                    <span className="relative z-10  transition duration-300">Get Started</span>
                    <span className="absolute inset-0 w-0 group-hover:w-full bg-primary transition-all duration-500 ease-out"></span>
                    </Button>
                </LoginLink>
            }
         
           
           
        </div>


    </div>
  )
}

export default Header
