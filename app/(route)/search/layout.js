'use client';

import React, { useState } from 'react';
import CategoryList from './_components/CategoryList';

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-sans ">
      
      {/* Mobile Header */}
        <header className="lg:hidden shadow-none px-3 py-2 mt-2 flex justify-end sticky top-0 z-20 w-full">
          <button
            onClick={() => setMenuOpen(prev => !prev)}
            className="flex items-center gap-1 p-2 text-gray-600 hover:text-[#33b9cb] focus:outline-none transition"
          >
            <span className="text-sm font-semibold">Menu</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  menuOpen
                    ? 'M6 18L18 6M6 6l12 12'
                    : 'M4 6h16M4 12h16M4 18h16'
                }
              />
            </svg>
          </button>
        </header>


      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-80  rounded-r-2xl  transform transition-transform duration-500 ease-out
          lg:relative lg:translate-x-0
          ${menuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="h-full flex flex-col">
          <div className="hidden lg:flex items-center justify-center h-16 rounded-t-2xl">
            <h2 className="text-xl font-bold text-primary tracking-wide">Categories</h2>
          </div>
          <CategoryList />
        </div>
      </aside>

     
      {menuOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/10 backdrop-blur-sm  lg:hidden transition-opacity duration-300 cursor-pointer"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Main Content */}
    <main className="w-full flex-1 px-4 sm:px-6 lg:px-2 2xl:px-2 max-w-full 2xl:max-w-screen-2xl mx-auto transition-all duration-300">
      {children}
    </main>


    </div>
  );
}
