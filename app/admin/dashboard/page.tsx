"use client";
import { useAuthStore } from "@/features/auth/store/useAuthStore";

export default function DashboardTwo() {
  const { user } = useAuthStore();

  if (!user) return <p>Loading user...</p>;

  return <p>Your email: {user.email}</p>;
  // return (
  //   <div className="rounded-lg border-2 border-dashed border-gray-200">
  //     <div className="mb-4 grid grid-cols-3 gap-4">
  //       <div className="flex h-24 items-center justify-center rounded bg-gray-50">
  //         <p className="text-2xl text-gray-400">
  //           <svg
  //             className="h-3.5 w-3.5"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 18 18"
  //           >
  //             <path
  //               stroke="currentColor"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M9 1v16M1 9h16"
  //             />
  //           </svg>
  //         </p>
  //       </div>
  //       <div className="flex h-24 items-center justify-center rounded bg-gray-50">
  //         <p className="text-2xl text-gray-400">
  //           <svg
  //             className="h-3.5 w-3.5"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 18 18"
  //           >
  //             <path
  //               stroke="currentColor"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M9 1v16M1 9h16"
  //             />
  //           </svg>
  //         </p>
  //       </div>
  //       <div className="flex h-24 items-center justify-center rounded bg-gray-50">
  //         <p className="text-2xl text-gray-400">
  //           <svg
  //             className="h-3.5 w-3.5"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 18 18"
  //           >
  //             <path
  //               stroke="currentColor"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M9 1v16M1 9h16"
  //             />
  //           </svg>
  //         </p>
  //       </div>
  //     </div>
  //     <div className="mb-4 grid grid-cols-3 gap-4">
  //       <div className="flex h-24 items-center justify-center rounded bg-gray-50">
  //         <p className="text-2xl text-gray-400">
  //           <svg
  //             className="h-3.5 w-3.5"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 18 18"
  //           >
  //             <path
  //               stroke="currentColor"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M9 1v16M1 9h16"
  //             />
  //           </svg>
  //         </p>
  //       </div>
  //       <div className="flex h-24 items-center justify-center rounded bg-gray-50">
  //         <p className="text-2xl text-gray-400">
  //           <svg
  //             className="h-3.5 w-3.5"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 18 18"
  //           >
  //             <path
  //               stroke="currentColor"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M9 1v16M1 9h16"
  //             />
  //           </svg>
  //         </p>
  //       </div>
  //       <div className="flex h-24 items-center justify-center rounded bg-gray-50">
  //         <p className="text-2xl text-gray-400">
  //           <svg
  //             className="h-3.5 w-3.5"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 18 18"
  //           >
  //             <path
  //               stroke="currentColor"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M9 1v16M1 9h16"
  //             />
  //           </svg>
  //         </p>
  //       </div>
  //     </div>
  //     <div className="mb-4 grid grid-cols-3 gap-4">
  //       <div className="flex h-24 items-center justify-center rounded bg-gray-50">
  //         <p className="text-2xl text-gray-400">
  //           <svg
  //             className="h-3.5 w-3.5"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 18 18"
  //           >
  //             <path
  //               stroke="currentColor"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M9 1v16M1 9h16"
  //             />
  //           </svg>
  //         </p>
  //       </div>
  //       <div className="flex h-24 items-center justify-center rounded bg-gray-50">
  //         <p className="text-2xl text-gray-400">
  //           <svg
  //             className="h-3.5 w-3.5"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 18 18"
  //           >
  //             <path
  //               stroke="currentColor"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M9 1v16M1 9h16"
  //             />
  //           </svg>
  //         </p>
  //       </div>
  //       <div className="flex h-24 items-center justify-center rounded bg-gray-50">
  //         <p className="text-2xl text-gray-400">
  //           <svg
  //             className="h-3.5 w-3.5"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 18 18"
  //           >
  //             <path
  //               stroke="currentColor"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M9 1v16M1 9h16"
  //             />
  //           </svg>
  //         </p>
  //       </div>
  //     </div>
  //     <div className="mb-4 grid grid-cols-3 gap-4">
  //       <div className="flex h-24 items-center justify-center rounded bg-gray-50">
  //         <p className="text-2xl text-gray-400">
  //           <svg
  //             className="h-3.5 w-3.5"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 18 18"
  //           >
  //             <path
  //               stroke="currentColor"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M9 1v16M1 9h16"
  //             />
  //           </svg>
  //         </p>
  //       </div>
  //       <div className="flex h-24 items-center justify-center rounded bg-gray-50">
  //         <p className="text-2xl text-gray-400">
  //           <svg
  //             className="h-3.5 w-3.5"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 18 18"
  //           >
  //             <path
  //               stroke="currentColor"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M9 1v16M1 9h16"
  //             />
  //           </svg>
  //         </p>
  //       </div>
  //       <div className="flex h-24 items-center justify-center rounded bg-gray-50">
  //         <p className="text-2xl text-gray-400">
  //           <svg
  //             className="h-3.5 w-3.5"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 18 18"
  //           >
  //             <path
  //               stroke="currentColor"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M9 1v16M1 9h16"
  //             />
  //           </svg>
  //         </p>
  //       </div>
  //     </div>
  //     <div className="mb-4 grid grid-cols-3 gap-4">
  //       <div className="flex h-24 items-center justify-center rounded bg-gray-50">
  //         <p className="text-2xl text-gray-400">
  //           <svg
  //             className="h-3.5 w-3.5"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 18 18"
  //           >
  //             <path
  //               stroke="currentColor"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M9 1v16M1 9h16"
  //             />
  //           </svg>
  //         </p>
  //       </div>
  //       <div className="flex h-24 items-center justify-center rounded bg-gray-50">
  //         <p className="text-2xl text-gray-400">
  //           <svg
  //             className="h-3.5 w-3.5"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 18 18"
  //           >
  //             <path
  //               stroke="currentColor"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M9 1v16M1 9h16"
  //             />
  //           </svg>
  //         </p>
  //       </div>
  //       <div className="flex h-24 items-center justify-center rounded bg-gray-50">
  //         <p className="text-2xl text-gray-400">
  //           <svg
  //             className="h-3.5 w-3.5"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 18 18"
  //           >
  //             <path
  //               stroke="currentColor"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M9 1v16M1 9h16"
  //             />
  //           </svg>
  //         </p>
  //       </div>
  //     </div>
  //     <div className="mb-4 grid grid-cols-3 gap-4">
  //       <div className="flex h-24 items-center justify-center rounded bg-gray-50">
  //         <p className="text-2xl text-gray-400">
  //           <svg
  //             className="h-3.5 w-3.5"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 18 18"
  //           >
  //             <path
  //               stroke="currentColor"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M9 1v16M1 9h16"
  //             />
  //           </svg>
  //         </p>
  //       </div>
  //       <div className="flex h-24 items-center justify-center rounded bg-gray-50">
  //         <p className="text-2xl text-gray-400">
  //           <svg
  //             className="h-3.5 w-3.5"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 18 18"
  //           >
  //             <path
  //               stroke="currentColor"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M9 1v16M1 9h16"
  //             />
  //           </svg>
  //         </p>
  //       </div>
  //       <div className="flex h-24 items-center justify-center rounded bg-gray-50">
  //         <p className="text-2xl text-gray-400">
  //           <svg
  //             className="h-3.5 w-3.5"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 18 18"
  //           >
  //             <path
  //               stroke="currentColor"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M9 1v16M1 9h16"
  //             />
  //           </svg>
  //         </p>
  //       </div>
  //     </div>
  //     <div className="mb-4 grid grid-cols-3 gap-4">
  //       <div className="flex h-24 items-center justify-center rounded bg-gray-50">
  //         <p className="text-2xl text-gray-400">
  //           <svg
  //             className="h-3.5 w-3.5"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 18 18"
  //           >
  //             <path
  //               stroke="currentColor"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M9 1v16M1 9h16"
  //             />
  //           </svg>
  //         </p>
  //       </div>
  //       <div className="flex h-24 items-center justify-center rounded bg-gray-50">
  //         <p className="text-2xl text-gray-400">
  //           <svg
  //             className="h-3.5 w-3.5"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 18 18"
  //           >
  //             <path
  //               stroke="currentColor"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M9 1v16M1 9h16"
  //             />
  //           </svg>
  //         </p>
  //       </div>
  //       <div className="flex h-24 items-center justify-center rounded bg-gray-50">
  //         <p className="text-2xl text-gray-400">
  //           <svg
  //             className="h-3.5 w-3.5"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 18 18"
  //           >
  //             <path
  //               stroke="currentColor"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M9 1v16M1 9h16"
  //             />
  //           </svg>
  //         </p>
  //       </div>
  //     </div>{" "}
  //     <div className="mb-4 grid grid-cols-3 gap-4">
  //       <div className="flex h-24 items-center justify-center rounded bg-gray-50">
  //         <p className="text-2xl text-gray-400">
  //           <svg
  //             className="h-3.5 w-3.5"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 18 18"
  //           >
  //             <path
  //               stroke="currentColor"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M9 1v16M1 9h16"
  //             />
  //           </svg>
  //         </p>
  //       </div>
  //       <div className="flex h-24 items-center justify-center rounded bg-gray-50">
  //         <p className="text-2xl text-gray-400">
  //           <svg
  //             className="h-3.5 w-3.5"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 18 18"
  //           >
  //             <path
  //               stroke="currentColor"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M9 1v16M1 9h16"
  //             />
  //           </svg>
  //         </p>
  //       </div>
  //       <div className="flex h-24 items-center justify-center rounded bg-gray-50">
  //         <p className="text-2xl text-gray-400">
  //           <svg
  //             className="h-3.5 w-3.5"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 18 18"
  //           >
  //             <path
  //               stroke="currentColor"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M9 1v16M1 9h16"
  //             />
  //           </svg>
  //         </p>
  //       </div>
  //     </div>{" "}
  //     <div className="mb-4 grid grid-cols-3 gap-4">
  //       <div className="flex h-24 items-center justify-center rounded bg-gray-50">
  //         <p className="text-2xl text-gray-400">
  //           <svg
  //             className="h-3.5 w-3.5"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 18 18"
  //           >
  //             <path
  //               stroke="currentColor"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M9 1v16M1 9h16"
  //             />
  //           </svg>
  //         </p>
  //       </div>
  //       <div className="flex h-24 items-center justify-center rounded bg-gray-50">
  //         <p className="text-2xl text-gray-400">
  //           <svg
  //             className="h-3.5 w-3.5"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 18 18"
  //           >
  //             <path
  //               stroke="currentColor"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M9 1v16M1 9h16"
  //             />
  //           </svg>
  //         </p>
  //       </div>
  //       <div className="flex h-24 items-center justify-center rounded bg-gray-50">
  //         <p className="text-2xl text-gray-400">
  //           <svg
  //             className="h-3.5 w-3.5"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 18 18"
  //           >
  //             <path
  //               stroke="currentColor"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M9 1v16M1 9h16"
  //             />
  //           </svg>
  //         </p>
  //       </div>
  //     </div>{" "}
  //     <div className="mb-4 grid grid-cols-3 gap-4">
  //       <div className="flex h-24 items-center justify-center rounded bg-gray-50">
  //         <p className="text-2xl text-gray-400">
  //           <svg
  //             className="h-3.5 w-3.5"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 18 18"
  //           >
  //             <path
  //               stroke="currentColor"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M9 1v16M1 9h16"
  //             />
  //           </svg>
  //         </p>
  //       </div>
  //       <div className="flex h-24 items-center justify-center rounded bg-gray-50">
  //         <p className="text-2xl text-gray-400">
  //           <svg
  //             className="h-3.5 w-3.5"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 18 18"
  //           >
  //             <path
  //               stroke="currentColor"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M9 1v16M1 9h16"
  //             />
  //           </svg>
  //         </p>
  //       </div>
  //       <div className="flex h-24 items-center justify-center rounded bg-gray-50">
  //         <p className="text-2xl text-gray-400">
  //           <svg
  //             className="h-3.5 w-3.5"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 18 18"
  //           >
  //             <path
  //               stroke="currentColor"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M9 1v16M1 9h16"
  //             />
  //           </svg>
  //         </p>
  //       </div>
  //     </div>{" "}
  //     <div className="mb-4 grid grid-cols-3 gap-4">
  //       <div className="flex h-24 items-center justify-center rounded bg-gray-50">
  //         <p className="text-2xl text-gray-400">
  //           <svg
  //             className="h-3.5 w-3.5"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 18 18"
  //           >
  //             <path
  //               stroke="currentColor"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M9 1v16M1 9h16"
  //             />
  //           </svg>
  //         </p>
  //       </div>
  //       <div className="flex h-24 items-center justify-center rounded bg-gray-50">
  //         <p className="text-2xl text-gray-400">
  //           <svg
  //             className="h-3.5 w-3.5"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 18 18"
  //           >
  //             <path
  //               stroke="currentColor"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M9 1v16M1 9h16"
  //             />
  //           </svg>
  //         </p>
  //       </div>
  //       <div className="flex h-24 items-center justify-center rounded bg-gray-50">
  //         <p className="text-2xl text-gray-400">
  //           <svg
  //             className="h-3.5 w-3.5"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 18 18"
  //           >
  //             <path
  //               stroke="currentColor"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M9 1v16M1 9h16"
  //             />
  //           </svg>
  //         </p>
  //       </div>
  //     </div>{" "}
  //     <div className="mb-4 grid grid-cols-3 gap-4">
  //       <div className="flex h-24 items-center justify-center rounded bg-gray-50">
  //         <p className="text-2xl text-gray-400">
  //           <svg
  //             className="h-3.5 w-3.5"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 18 18"
  //           >
  //             <path
  //               stroke="currentColor"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M9 1v16M1 9h16"
  //             />
  //           </svg>
  //         </p>
  //       </div>
  //       <div className="flex h-24 items-center justify-center rounded bg-gray-50">
  //         <p className="text-2xl text-gray-400">
  //           <svg
  //             className="h-3.5 w-3.5"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 18 18"
  //           >
  //             <path
  //               stroke="currentColor"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M9 1v16M1 9h16"
  //             />
  //           </svg>
  //         </p>
  //       </div>
  //       <div className="flex h-24 items-center justify-center rounded bg-gray-50">
  //         <p className="text-2xl text-gray-400">
  //           <svg
  //             className="h-3.5 w-3.5"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 18 18"
  //           >
  //             <path
  //               stroke="currentColor"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M9 1v16M1 9h16"
  //             />
  //           </svg>
  //         </p>
  //       </div>
  //     </div>{" "}
  //     <div className="mb-4 grid grid-cols-3 gap-4">
  //       <div className="flex h-24 items-center justify-center rounded bg-gray-50">
  //         <p className="text-2xl text-gray-400">
  //           <svg
  //             className="h-3.5 w-3.5"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 18 18"
  //           >
  //             <path
  //               stroke="currentColor"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M9 1v16M1 9h16"
  //             />
  //           </svg>
  //         </p>
  //       </div>
  //       <div className="flex h-24 items-center justify-center rounded bg-gray-50">
  //         <p className="text-2xl text-gray-400">
  //           <svg
  //             className="h-3.5 w-3.5"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 18 18"
  //           >
  //             <path
  //               stroke="currentColor"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M9 1v16M1 9h16"
  //             />
  //           </svg>
  //         </p>
  //       </div>
  //       <div className="flex h-24 items-center justify-center rounded bg-gray-50">
  //         <p className="text-2xl text-gray-400">
  //           <svg
  //             className="h-3.5 w-3.5"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 18 18"
  //           >
  //             <path
  //               stroke="currentColor"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M9 1v16M1 9h16"
  //             />
  //           </svg>
  //         </p>
  //       </div>
  //     </div>{" "}
  //     <div className="mb-4 grid grid-cols-3 gap-4">
  //       <div className="flex h-24 items-center justify-center rounded bg-gray-50">
  //         <p className="text-2xl text-gray-400">
  //           <svg
  //             className="h-3.5 w-3.5"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 18 18"
  //           >
  //             <path
  //               stroke="currentColor"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M9 1v16M1 9h16"
  //             />
  //           </svg>
  //         </p>
  //       </div>
  //       <div className="flex h-24 items-center justify-center rounded bg-gray-50">
  //         <p className="text-2xl text-gray-400">
  //           <svg
  //             className="h-3.5 w-3.5"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 18 18"
  //           >
  //             <path
  //               stroke="currentColor"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M9 1v16M1 9h16"
  //             />
  //           </svg>
  //         </p>
  //       </div>
  //       <div className="flex h-24 items-center justify-center rounded bg-gray-50">
  //         <p className="text-2xl text-gray-400">
  //           <svg
  //             className="h-3.5 w-3.5"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 18 18"
  //           >
  //             <path
  //               stroke="currentColor"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M9 1v16M1 9h16"
  //             />
  //           </svg>
  //         </p>
  //       </div>
  //     </div>{" "}
  //     <div className="mb-4 grid grid-cols-3 gap-4">
  //       <div className="flex h-24 items-center justify-center rounded bg-gray-50">
  //         <p className="text-2xl text-gray-400">
  //           <svg
  //             className="h-3.5 w-3.5"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 18 18"
  //           >
  //             <path
  //               stroke="currentColor"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M9 1v16M1 9h16"
  //             />
  //           </svg>
  //         </p>
  //       </div>
  //       <div className="flex h-24 items-center justify-center rounded bg-gray-50">
  //         <p className="text-2xl text-gray-400">
  //           <svg
  //             className="h-3.5 w-3.5"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 18 18"
  //           >
  //             <path
  //               stroke="currentColor"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M9 1v16M1 9h16"
  //             />
  //           </svg>
  //         </p>
  //       </div>
  //       <div className="flex h-24 items-center justify-center rounded bg-gray-50">
  //         <p className="text-2xl text-gray-400">
  //           <svg
  //             className="h-3.5 w-3.5"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 18 18"
  //           >
  //             <path
  //               stroke="currentColor"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M9 1v16M1 9h16"
  //             />
  //           </svg>
  //         </p>
  //       </div>
  //     </div>{" "}
  //     <div className="mb-4 grid grid-cols-3 gap-4">
  //       <div className="flex h-24 items-center justify-center rounded bg-gray-50">
  //         <p className="text-2xl text-gray-400">
  //           <svg
  //             className="h-3.5 w-3.5"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 18 18"
  //           >
  //             <path
  //               stroke="currentColor"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M9 1v16M1 9h16"
  //             />
  //           </svg>
  //         </p>
  //       </div>
  //       <div className="flex h-24 items-center justify-center rounded bg-gray-50">
  //         <p className="text-2xl text-gray-400">
  //           <svg
  //             className="h-3.5 w-3.5"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 18 18"
  //           >
  //             <path
  //               stroke="currentColor"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M9 1v16M1 9h16"
  //             />
  //           </svg>
  //         </p>
  //       </div>
  //       <div className="flex h-24 items-center justify-center rounded bg-gray-50">
  //         <p className="text-2xl text-gray-400">
  //           <svg
  //             className="h-3.5 w-3.5"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 18 18"
  //           >
  //             <path
  //               stroke="currentColor"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M9 1v16M1 9h16"
  //             />
  //           </svg>
  //         </p>
  //       </div>
  //     </div>
  //   </div>
  // );
}
