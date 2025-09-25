"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
// import { session } from "@/actions/auth";

interface UserData {
  id: string | number;
  name: string;
  email: string;
  user_type?: string;
}

interface SessionContextType {
  user: UserData | null;
  isAuthenticated: boolean;
  updateSession: () => Promise<void>;
  clearSession: () => void;
}

const SessionContext = createContext<SessionContextType>({
  user: null,
  isAuthenticated: false,
  updateSession: async () => {},
  clearSession: () => {},
});

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const updateSession = async () => {
    // try {
    //   const sessionData = await session();
    //   if (sessionData) {
    //     setUser({
    //       id: sessionData.id,
    //       name: sessionData.name,
    //       email: sessionData.email,
    //       user_type: sessionData.user_type,
    //     });
    //     setIsAuthenticated(true);
    //   } else {
    //     setUser(null);
    //     setIsAuthenticated(false);
    //   }
    // } catch (error) {
    //   console.error("Session update failed", error);
    //   setUser(null);
    //   setIsAuthenticated(false);
    // }
  };

  const clearSession = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    updateSession();
  }, []);

  return (
    <SessionContext.Provider value={{ user, isAuthenticated, updateSession, clearSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
