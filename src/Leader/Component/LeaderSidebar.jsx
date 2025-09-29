import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import IconOverview from '../../Icons/IconOverview';
import IconLeads from '../../Icons/IconLeads';
import IconCompany from '../../Icons/IconCompany';

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
    to: "company",
    name: "Company",
    icon: <IconCompany />,
    iconActive: <IconCompany active />
  },
];

const LeaderSidebar = ({ setIsOpen, isOpen }) => {
  const [isActive, setIsActive] = useState('/leader/overview');
  const location = useLocation();

  useEffect(() => {
    const customPaths = {
      '/leader/addlead': '/leader/Lead',
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
      {/* Mobile Sidebar */}
      <div className={`block md:hidden bg-one h-screen ${isOpen ? "absolute w-full" : ""} rounded-r-3xl top-0 z-50 transition-all duration-300`}>
        <div
          className={`flex items-center ${isOpen ? 'justify-start gap-4 px-4' : 'justify-center'} py-4 cursor-pointer`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className='flex justify-center items-center z-100'>
  <svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_30_350)">
                <path d="M8.7176 6.05474C9.43288 6.62097 10.0614 7.27928 10.7029 7.92648C10.8829 8.10791 11.0633 8.28891 11.2437 8.46997C11.5555 8.78306 11.867 9.09641 12.1784 9.40994C12.6291 9.86384 13.0803 10.3173 13.5316 10.7706C14.2648 11.5071 14.9976 12.2439 15.7303 12.9809C15.774 13.0249 15.8178 13.0689 15.8629 13.1143C15.9067 13.1583 15.9505 13.2024 15.9956 13.2478C16.6171 13.873 17.2386 14.4981 17.8602 15.1231C17.9259 15.1891 17.9259 15.1891 17.9929 15.2564C18.7234 15.9909 19.454 16.7252 20.1847 17.4594C20.6347 17.9116 21.0845 18.3639 21.5342 18.8164C21.8422 19.1264 22.1504 19.4363 22.4586 19.7461C22.6362 19.9246 22.8138 20.1031 22.9912 20.2819C23.1839 20.476 23.3768 20.6698 23.5698 20.8636C23.6253 20.9196 23.6808 20.9756 23.7379 21.0333C24.0315 21.3277 24.3313 21.61 24.6465 21.8811C25.7092 22.8057 26.8387 24.0254 26.9604 25.5034C27.0084 26.9419 26.8038 28.0713 25.8431 29.1916C25.0014 30.0869 23.9218 30.7472 22.669 30.7928C21.2279 30.8261 20.0922 30.5053 18.9878 29.5456C18.9251 29.4992 18.8625 29.4528 18.7979 29.4049C18.5922 29.2257 18.4245 29.025 18.2485 28.8169C18.1296 28.6853 18.0092 28.5758 17.8709 28.4655C17.8097 28.4146 17.7485 28.3637 17.6855 28.3112C17.6855 28.2633 17.6855 28.2153 17.6855 28.166C17.6139 28.142 17.5422 28.118 17.4684 28.0934C17.3517 27.972 17.3517 27.972 17.2288 27.8211C17.0675 27.6288 16.9097 27.4597 16.7133 27.3037C16.6521 27.2528 16.5909 27.2018 16.5279 27.1494C16.5279 27.1014 16.4555 27.1261 16.4555 27.0768C16.4152 27.0618 16.4473 26.9742 16.4058 26.9588C16.2207 26.8483 16.1164 26.7157 15.9844 26.5475C15.8608 26.4049 15.7263 26.2869 15.5828 26.1645C15.3615 25.9755 15.1901 25.7798 15.0085 25.5519C14.87 25.4251 14.7279 25.3033 14.5854 25.1811C14.3283 24.954 14.0908 24.7078 13.8509 24.4626C13.7303 24.3416 13.6097 24.2206 13.4891 24.0996C11.6803 22.2842 11.6803 22.2842 11.5108 22.114C11.3194 21.9219 11.1276 21.7303 10.9356 21.5388C10.8591 21.4624 10.7826 21.386 10.7061 21.3096C10.6656 21.2693 10.6251 21.2289 10.5835 21.1873C9.64869 20.2543 8.71476 19.3204 7.7813 18.3861C7.24207 17.8464 6.70256 17.307 6.16242 16.7682C5.69023 16.2972 5.21856 15.8257 4.7475 15.3536C4.4986 15.1041 4.24945 14.855 3.99968 14.6064C3.76441 14.3723 3.52984 14.1374 3.29578 13.9021C3.21029 13.8164 3.12456 13.7309 3.03855 13.6457C1.92855 12.5454 1.2262 11.3517 1.15771 9.74921C1.17731 8.5444 1.75639 7.39676 2.56405 6.52696C4.2423 4.90134 6.8177 4.66308 8.7176 6.05474Z" fill="#31FF70" />
                <path d="M28.1248 0.5C28.1248 7.76068 28.1248 15.0214 28.1248 22.5021C27.9149 22.2915 27.7051 22.0808 27.4955 21.87C27.4453 21.8195 27.3951 21.769 27.3434 21.717C27.2894 21.6627 27.2355 21.6085 27.1799 21.5526C26.5916 20.9609 26.003 20.3694 25.4144 19.7781C25.0586 19.4206 24.7029 19.0631 24.3474 18.7054C24.0028 18.3588 23.658 18.0123 23.3131 17.666C23.1821 17.5344 23.0511 17.4026 22.9202 17.2708C22.7366 17.0861 22.5529 16.9017 22.3691 16.7172C22.3156 16.6633 22.2621 16.6093 22.207 16.5537C21.9158 16.2621 21.6181 15.9834 21.305 15.7156C21.1125 15.5446 20.947 15.3569 20.7766 15.1635C20.5565 14.9161 20.3358 14.6804 20.0802 14.4691C20.0131 14.4122 19.9459 14.3553 19.8767 14.2967C19.8767 14.2488 19.8767 14.2008 19.8767 14.1515C19.829 14.1515 19.7812 14.1515 19.732 14.1515C19.732 14.1035 19.732 14.0556 19.732 14.0062C19.6843 14.0062 19.6365 14.0062 19.5873 14.0062C19.4777 13.897 19.4777 13.897 19.3522 13.7475C19.1636 13.522 19.1636 13.522 18.9664 13.3042C18.0972 12.372 17.938 11.1829 17.971 9.96054C18.0297 8.77394 18.6433 7.73992 19.4969 6.94734C19.8029 6.67678 20.1331 6.44458 20.4688 6.21326C20.7801 5.99736 21.0763 5.7634 21.3735 5.52853C21.8863 5.12439 22.4071 4.73283 22.9332 4.34635C23.2561 4.10891 23.576 3.86863 23.8923 3.62241C24.266 3.33146 24.6456 3.04957 25.0273 2.76919C25.4954 2.4249 25.9581 2.07472 26.4155 1.71629C26.4958 1.6534 26.4958 1.6534 26.5776 1.58925C26.7804 1.43016 26.9829 1.27085 27.1852 1.11119C27.3173 1.00701 27.4497 0.903238 27.5822 0.799533C27.693 0.712201 27.693 0.712201 27.806 0.623104C27.9801 0.5 27.9801 0.5 28.1248 0.5Z" fill="#31FF70" />
                <path d="M0 13.7158C0.11938 13.8356 0.23876 13.9554 0.361757 14.0788C0.470779 14.1803 0.579839 14.2818 0.689413 14.3827C1.55414 15.1808 2.3811 16.0181 3.21286 16.8504C3.29668 16.9342 3.3805 17.018 3.46432 17.1019C3.85757 17.4952 4.25066 17.8886 4.64353 18.2823C5.09389 18.7336 5.54484 19.1843 5.9963 19.6344C6.34787 19.9851 6.69889 20.3363 7.04949 20.6879C7.25784 20.8969 7.46641 21.1056 7.67559 21.3137C7.87198 21.5091 8.06766 21.7052 8.26283 21.9018C8.334 21.9733 8.40541 22.0445 8.4771 22.1154C9.04905 22.6819 9.52582 23.2852 9.82623 24.0406C9.85356 24.1075 9.88088 24.1744 9.90904 24.2434C10.3256 25.4537 10.2041 26.5992 9.65609 27.7453C9.08552 28.8024 8.23111 29.4436 7.28082 30.1334C7.03854 30.3095 6.79789 30.4877 6.55727 30.6661C6.3865 30.7926 6.21549 30.9188 6.04445 31.045C5.58924 31.3815 5.13735 31.7223 4.68564 32.0635C4.42869 32.2575 4.17132 32.4509 3.91404 32.6445C3.75173 32.7667 3.58951 32.8891 3.42737 33.0115C2.8397 33.4551 2.24922 33.8945 1.65629 34.3309C1.23001 34.6455 0.810854 34.968 0.395672 35.2972C0.217054 35.4274 0.217054 35.4274 0 35.5C0 28.3112 0 21.1224 0 13.7158Z" fill="#31FF70" />
              </g>
              <defs>
                <clipPath id="clip0_30_350">
                  <rect width="28" height="35" fill="white" transform="translate(0 0.5)" />
                </clipPath>
              </defs>
            </svg>
          </div>
          {isOpen && (
            <h1 className="text-two font-bold text-[14px] lg:text-[20px]">Negotia</h1>
          )}
        </div>

        <div className="border-1 border-gray-300 w-full px-3" />

        <nav
          className="space-y-3 pt-6 text-center px-2 h-[calc(100vh-100px)] overflow-y-auto"
          style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
        >
          {links.map((link) => {
            const isCurrent = isActive === `/leader/${link.to}`;
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

      {/* Desktop Sidebar */}
      <div className="hidden md:block bg-one h-screen sticky rounded-tr-3xl top-0 z-50 transition-all duration-300">
        <div
          className={`flex items-center ${isOpen ? 'justify-start gap-4 px-4' : 'justify-center'} py-4 cursor-pointer`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className='flex justify-center items-center z-100'>
            {/* Logo */}
            <svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* SVG content */}
            </svg>
          </div>
          {isOpen && (
            <h1 className="text-two font-bold text-[14px] lg:text-[24px]">Negotia</h1>
          )}
        </div>

        <div className="border-1 border-gray-300 w-full px-3" />

        <nav
          className="space-y-3 pt-6 text-center px-2 h-[calc(100vh-100px)] overflow-y-auto"
          style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
        >
          {links.map((link) => {
            const isCurrent = isActive === `/leader/${link.to}`;
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

export default LeaderSidebar;
