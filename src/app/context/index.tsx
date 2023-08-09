// @ts-nocheck
"use client";


import { createContext, useContext, useEffect, useState, useMemo } from "react";
import supabase from "../../../supabase";
import Landing from "@/components/Landing";
import Header from "@/components/Header";

const AuthContext = createContext({});

export const AuthContextProvider = ({children, switchTheme}: any) => {
    const [user, setUser] = useState(false);
    
    const onAuthStateChange = async () => {
        try {
          
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            setUser(user);
          }
    
        } catch (error) {
          console.log(error)
        } finally {
    
        }
      };

      useEffect(() => {
        onAuthStateChange();
      }, []);
      const value = useMemo(() => {
        return {
          user,
          signOut: () => {
            supabase.auth.signOut(); 
            setUser(false)},
        };
      }, [user]);
      return (
        <AuthContext.Provider value={value}> 
          <Header switchTheme={switchTheme} user={user}/>
           {user ? children : <Landing />}  
        </AuthContext.Provider>
      )

}

export const useAuthContext = () => {
  const { user, signOut } = useContext(AuthContext);
  return { user, signOut };  
};
 