"use client";

import { Icons } from "@/components/Icons";
import { useSidebar } from "@/contexts/SidebarContext";
import React, { useState } from "react";
import { MessageDropdown } from "./_components/MessageDropdown";
import { NotificationDropdown } from "./_components/NotificationDropdown";
import { UserProfileDropdown } from "./_components/UserProfileDropdown";

interface NavigationButtonProps {
  onClick: () => void;
  ariaControls: string;
  children: React.ReactNode;
}

export const NavigationButton: React.FC<NavigationButtonProps> = ({
  onClick,
  ariaControls,
  children,
}) => (
  <button
    onClick={onClick}
    aria-controls={ariaControls}
    type="button"
    className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 sm:hidden"
  >
    {children}
  </button>
);

export const MenuIcon: React.FC = () => (
  <svg
    className="h-6 w-6"
    aria-hidden="true"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      clipRule="evenodd"
      fillRule="evenodd"
      d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
    />
  </svg>
);

const AppHeader: React.FC = () => {
  const { toggleSidebar } = useSidebar();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search logic here
    console.log("Search query:", searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
      <div className="px-4 sm:px-10">
        <nav className="flex items-center justify-between py-5">
          {/* Left Side: Menu Toggle and Search (Desktop Only) */}
          <div className="flex items-center">
            <NavigationButton onClick={toggleSidebar} ariaControls="logo-sidebar">
              <span className="sr-only">Toggle sidebar</span>
              <MenuIcon />
            </NavigationButton>

            {/* Desktop Search - Hidden on mobile */}
            <div className="hidden w-full max-w-xs md:block">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="search"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Icons.search className="h-5 w-5 text-gray-500" />
                </div>
              </form>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-baseline gap-8 leading-normal">
            {/* <NotificationDropdown />
            <MessageDropdown /> */}
            <UserProfileDropdown />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;

// "use client";

// import { Icons } from "@/components/Icons";
// import { useSidebar } from "@/contexts/SidebarContext";
// import React, { useState } from "react";
// import { MessageDropdown } from "./_components/MessageDropdown";
// import { NotificationDropdown } from "./_components/NotificationDropdown";
// import { UserProfileDropdown } from "./_components/UserProfileDropdown";

// interface NavigationButtonProps {
//   onClick: () => void;
//   ariaControls: string;
//   children: React.ReactNode;
// }

// export const NavigationButton: React.FC<NavigationButtonProps> = ({
//   onClick,
//   ariaControls,
//   children,
// }) => (
//   <button
//     onClick={onClick}
//     aria-controls={ariaControls}
//     type="button"
//     className="relative inline-flex items-center p-3 text-slate-600 rounded-xl transition-all duration-300 ease-out hover:bg-slate-100/80 hover:text-slate-900 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:ring-offset-2 focus:ring-offset-white group sm:hidden backdrop-blur-sm"
//   >
//     <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//     <div className="relative z-10">{children}</div>
//   </button>
// );

// export const MenuIcon: React.FC = () => (
//   <svg
//     className="w-5 h-5 transition-transform duration-200 group-hover:scale-110"
//     aria-hidden="true"
//     fill="currentColor"
//     viewBox="0 0 20 20"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       clipRule="evenodd"
//       fillRule="evenodd"
//       d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
//     />
//   </svg>
// );

// // const AppHeader: React.FC = () => {
// //   const { toggleSidebar } = useSidebar();
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [isSearchFocused, setIsSearchFocused] = useState(false);

// //   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setSearchQuery(e.target.value);
// //   };

// //   const handleSearchSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     // Implement search logic here
// //     console.log("Search query:", searchQuery);
// //   };

// //   const handleSearchFocus = () => {
// //     setIsSearchFocused(true);
// //   };

// //   const handleSearchBlur = () => {
// //     setIsSearchFocused(false);
// //   };

// //   return (
// //     <header className="sticky top-0 z-50 w-full">
// //       <div className="absolute inset-0 bg-white/95 backdrop-blur-xl border-b border-slate-200/60 shadow-sm"></div>
// //       <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/30 via-transparent to-purple-50/30"></div>

// //       <div className="relative px-4 sm:px-10">
// //         <nav className="flex items-center justify-between py-4">
// //           <div className="flex items-center space-x-6">
// //             <NavigationButton onClick={toggleSidebar} ariaControls="logo-sidebar">
// //               <span className="sr-only">Toggle sidebar</span>
// //               <MenuIcon />
// //             </NavigationButton>

// //             {/* Enhanced Desktop Search */}
// //             <div className="hidden md:block">
// //               <form onSubmit={handleSearchSubmit} className="relative group">
// //                 <div
// //                   className={`relative transition-all duration-300 ease-out ${
// //                     isSearchFocused ? "transform scale-105" : ""
// //                   }`}
// //                 >
// //                   {/* Search input with enhanced styling */}
// //                   <input
// //                     type="search"
// //                     placeholder="Search anything..."
// //                     value={searchQuery}
// //                     onChange={handleSearchChange}
// //                     onFocus={handleSearchFocus}
// //                     onBlur={handleSearchBlur}
// //                     className={`w-80 pl-12 pr-4 py-3 text-sm font-medium text-slate-900 placeholder-slate-500 bg-slate-50/80 border-2 rounded-2xl transition-all duration-300 ease-out focus:outline-none backdrop-blur-sm ${
// //                       isSearchFocused
// //                         ? "bg-white border-indigo-300 shadow-lg shadow-indigo-500/20 ring-4 ring-indigo-100/50"
// //                         : "border-slate-200/60 hover:border-slate-300/80 hover:bg-slate-50"
// //                     }`}
// //                   />

// //                   {/* Enhanced search icon */}
// //                   <div
// //                     className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-all duration-300 ${
// //                       isSearchFocused ? "text-indigo-500" : "text-slate-500"
// //                     }`}
// //                   >
// //                     <Icons.search className="w-5 h-5" />
// //                   </div>

// //                   {/* Search suggestions indicator */}
// //                   {searchQuery && (
// //                     <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
// //                       <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
// //                     </div>
// //                   )}

// //                   <div
// //                     className={`absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none ${
// //                       isSearchFocused
// //                         ? "opacity-100 bg-gradient-to-r from-indigo-500/5 to-purple-500/5"
// //                         : "opacity-0"
// //                     }`}
// //                   ></div>
// //                 </div>

// //                 <div
// //                   className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-all duration-200 ${
// //                     isSearchFocused ? "opacity-0 scale-95" : "opacity-60 scale-100"
// //                   }`}
// //                 >
// //                   <div className="hidden lg:flex items-center space-x-1">
// //                     <kbd className="px-2 py-1 text-xs font-semibold text-slate-500 bg-slate-200/60 rounded border border-slate-300/50">
// //                       ⌘
// //                     </kbd>
// //                     <kbd className="px-2 py-1 text-xs font-semibold text-slate-500 bg-slate-200/60 rounded border border-slate-300/50">
// //                       K
// //                     </kbd>
// //                   </div>
// //                 </div>
// //               </form>
// //             </div>
// //           </div>

// //           <div className="flex items-center space-x-2">
// //             <div className="flex items-center space-x-1 bg-slate-50/60 backdrop-blur-sm rounded-2xl p-1 border border-slate-200/50 shadow-sm">
// //               <div className="relative group">
// //                 <NotificationDropdown />
// //                 <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
// //               </div>

// //               <div className="w-px h-6 bg-slate-300/60"></div>

// //               <div className="relative group">
// //                 <MessageDropdown />
// //                 <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
// //               </div>
// //             </div>

// //             <div className="relative ml-4">
// //               <div className="relative group">
// //                 <UserProfileDropdown />
// //                 <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
// //               </div>
// //             </div>
// //           </div>
// //         </nav>
// //       </div>
// //     </header>
// //   );
// // };

// // export default AppHeader;
