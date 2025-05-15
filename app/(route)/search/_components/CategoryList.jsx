'use client';

import GlobalApi from '@/app/_utils/GlobalApi';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function CategoryList({ maxItems = 6 }) {
  const [categoryList, setCategoryList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const currentCategory = decodeURIComponent(pathname.split('/')[2] || '');

  useEffect(() => {
    let isMounted = true;
    const fetchCategories = async () => {
      try {
        const resp = await GlobalApi.getCategory();
        const fullList = resp.data?.data || [];
        if (isMounted) setCategoryList(fullList.slice(0, maxItems));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
    return () => {
      isMounted = false;
    };
  }, [pathname, maxItems]);

  const filtered = categoryList.filter((item) =>
    item.attributes?.Name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className="w-full sm:w-64 md:w-70 lg:w-70 p-4 sm:p-6 backdrop-blur-md shadow-2xl h-screen flex flex-col rounded-r-2xl bg-white/80">
      {/* Input Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#33b9cb] bg-white"
        />
      </div>

      {/* Category List */}
      <motion.ul
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.05 } },
        }}
        className="space-y-2 overflow-y-auto scrollbar-none flex-1"
      >
        {filtered.length > 0 ? (
          filtered.map((item, index) => {
            const rawIcon = item.attributes?.Icon?.data;
            const icon = Array.isArray(rawIcon) ? rawIcon[0] : rawIcon;
            const url = icon?.attributes?.url;
            const imageUrl = url
              ? (url.startsWith('http') ? url : `http://localhost:1337${url}`)
              : null;

            const isActive = currentCategory === item.attributes?.Name;

            return (
              <motion.li key={index} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
                <Link
                  href={`/search/${encodeURIComponent(item.attributes?.Name)}`}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all bg-[#33b9cb]  shadow-md hover:shadow-lg text-white duration-300 ${
                    isActive
                      ? 'bg-primary text-[#33b9cb]  ring-2 ring-[#33b9cb]'
                      : 'hover:text-primary'
                  }`}
                >
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt="icon"
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full object-cover shadow flex-shrink-0"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-600 shadow flex-shrink-0">
                      ?
                    </div>
                  )}
                  <span className="sm:text-md text-sm font-semibold truncate capitalize">
                    {item.attributes?.Name}
                  </span>
                </Link>
              </motion.li>
            );
          })
        ) : (
          <p className="text-center text-gray-400 text-sm mt-4">No Categories Found</p>
        )}
      </motion.ul>
    </aside>
  );
}
