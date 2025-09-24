import React, { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom";
import SellerSidebar from '../Seller/Component/SellerSidebar';
import SellerNavBar from '../Seller/Component/SellerNavBar';

const SellerLayout = ({ setRole }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setIsOpen(true);
    }

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex overflow-hidden h-screen relative bg-one">
      <aside
        className={`transition-all bg-one duration-100 ${
          isOpen ? 'w-56' : 'w-16'
        } border-1 border-r-white rounded-r-2xl p-1 z-10 top-0 h-screen`}
      >
        <SellerSidebar setIsOpen={setIsOpen} isOpen={isOpen} />
      </aside>

      <div className="flex-1 flex flex-col w-full overflow-auto p-2">
        <header className="rounded-[12px] shadow p-4 m-2">
          <SellerNavBar setRole={setRole} />
        </header>

        <main className="flex-1 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SellerLayout;
