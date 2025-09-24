import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import IconOverview from '../../Icons/IconOverview';
import IconLeads from '../../Icons/IconLeads';
import IconProduct from '../../Icons/IconProduct';
import IconOffer from '../../Icons/IconOffer';
import IconCommission from '../../Icons/IconCommission'
import IconScheduled from '../../Icons/IconScheduled'
import IconPayment from '../../Icons/IconPayment'
import { SiGooglecampaignmanager360 } from "react-icons/si";

const links = [
  {
    to: "overview",
    name: "Overview",
    icon: <IconOverview />,
    iconActive: <IconOverview active />
  },
  {
    to: "lead",
    name: "Lead",
    icon: <IconLeads />,
    iconActive: <IconLeads active />
  },
  {
    to: "Product",
    name: "Product",
    icon: <IconProduct />,
    iconActive: <IconProduct active />
  },
  {
    to: "offer",
    name: "Offer",
    icon: <IconOffer />,
    iconActive: <IconOffer active />
  },
  {
    to: "commission",
    name: "Commission",
    icon: <IconCommission />,
    iconActive: <IconCommission active />
  },
  {
    to: "scheduled",
    name: "Scheduled",
    icon: <IconScheduled />,
    iconActive: <IconScheduled active />
  },
  {
    to: "payment",
    name: "Payment",
    icon: <IconPayment />,
    iconActive: <IconPayment active />
  },
];

const SellerSidebar = ({ setIsOpen, isOpen }) => {
  const [isActive, setIsActive] = useState('/seller/overview');
  const location = useLocation();

  useEffect(() => {
    const customPaths = {
      '/seller/addscheduled': '/seller/scheduled',
      '/seller/addpayment': '/seller/payment',
      '/seller/addlead': '/seller/lead',
      '/seller/editlead': '/seller/lead',
    };

    const newPath = customPaths[location.pathname] || location.pathname;
    setIsActive(newPath);
  }, [location.pathname]);

  useEffect(() => {
    if (isOpen && window.innerWidth < 768) {
      setIsOpen(false);
    }
  }, [location.pathname]);

  return (
    <>
      {/* الموبايل */}
      <div className={`block md:hidden bg-one h-screen ${isOpen ? "absolute w-full" : ""} rounded-r-3xl top-0 z-50 transition-all duration-300`}>
        <div
          className={`flex items-center ${isOpen ? 'justify-start gap-4 px-4' : 'justify-center'} py-4 cursor-pointer`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* لوجو */}
          <div className='flex justify-center items-center z-100'>
            {/* SVG */}
        <SiGooglecampaignmanager360 className='h-8 w-8 text-four'/>
          </div>
          {isOpen && (
            <>
            <h1 className="text-two font-bold text-[14px] lg:text-[20px]">Negotia</h1>

            </>

          )}
        </div>

        <div className="border-1 border-gray-300 w-full px-3" />

        <nav className="space-y-3 pt-6 text-center px-2 h-[calc(100vh-100px)] overflow-y-auto"
          style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
          {links.map((link) => {
            const isCurrent = isActive === `/seller/${link.to}`;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={`flex items-center transition-all duration-200 rounded-3xl h-[48px] ${isOpen ? 'w-full pl-4 gap-3' : 'justify-center w-full'} relative`}
              >
                <div className={`absolute h-8 rounded-r-[12px] w-2 right-50 top-3 ${isCurrent ? "bg-four" : ""}`} />
                <div className="w-6 h-6">
                  {React.cloneElement(isCurrent ? link.iconActive : link.icon, {
                    className: `w-[22px] h-[22px] ${isCurrent ? 'text-three' : 'text-white'}`
                  })}
                </div>
                {isOpen && (
                  <span className={`font-bold text-[12px] ${isCurrent ? 'text-white' : 'text-three'}`}>
                    {link.name}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className={`hidden md:block bg-one h-screen sticky rounded-tr-3xl top-0 z-50 transition-all duration-300`}>
        <div
          className={`flex items-center ${isOpen ? 'justify-start gap-4 px-4' : 'justify-center'} py-4 cursor-pointer`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className='flex justify-center items-center z-100'>
            {/* SVG */}

          <SiGooglecampaignmanager360 className='h-8 w-8 text-four'/>
          </div>
          {isOpen && (
            <>
            <h1 className="text-two font-bold text-[14px] lg:text-[24px]">Negotia</h1>
            </>
          )}
        </div>

        <div className="border-1 border-gray-300 w-full px-3" />

        <nav className="space-y-3 pt-6 text-center px-2 h-[calc(100vh-100px)] overflow-y-auto"
          style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
          {links.map((link) => {
            const isCurrent = isActive === `/seller/${link.to}`;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={`flex items-center transition-all gap-5 duration-200 rounded-2xl h-[48px] ${isOpen ? 'w-full pl-2 gap-1' : 'justify-center w-full'} relative`}
              >
                <div className={`absolute h-8 rounded-r-[12px] w-2 right-50 top-3 ${isCurrent ? "bg-four" : ""}`} />
                <div className="w-6 h-6">
                  {React.cloneElement(isCurrent ? link.iconActive : link.icon, {
                    className: `w-[22px] h-[22px] ${isCurrent ? 'text-three' : 'text-white'}`
                  })}
                </div>
                {isOpen && (
                  <span className={`font-normal text-[14px] mt-2 lg:text-[18px] ${isCurrent ? 'lg:text-[20px] text-white' : 'text-three'}`}>
                    {link.name}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default SellerSidebar;
