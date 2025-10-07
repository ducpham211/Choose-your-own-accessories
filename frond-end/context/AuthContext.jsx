import { useState, useEffect, createContext } from "react";
import { supabase } from "../src/supabaseClient.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getSession = async () => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      console.log("Session object:", session); // Debug
      if (error) {
        console.error("getSession error:", error.message, error);
        throw new Error(`Cannot get session: ${error.message}`);
      }
      console.log(
        "Access Token:",
        session?.access_token || "No token yet (pending email confirmation)"
      );
      setUser(session?.user ?? null);
      setLoading(false);
    } catch (error) {
      console.error("getSession unexpected error:", error.message, error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getSession();
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        try {
          console.log("Auth state change event:", event, session);
          setUser(session?.user ?? null);
          setLoading(false);
        } catch (error) {
          console.error("onAuthStateChange error:", error.message, error);
        }
      }
    );

    return () => {
      console.log("Unsubscribing auth listener");
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: "http://localhost:3000/auth/callback" },
      });
      console.log("signUp full response:", { data, error }); // Debug
      if (error) {
        console.error("signUp error payload:", { error });
        return { success: false, error };
      }
      return { success: true, data };
    } catch (err) {
      console.error("signUp unexpected:", err);
      return { success: false, error: err };
    }
  };

  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (data.user) {
        // Tự insert vào public.users từ frontend
        await supabase.from("users").insert({
          id: data.user.id,
          email: email,
          role: "customer",
        });
        await supabase
          .from("carts")
          .insert({ user_id: data.user.id })
          .select()
          .single();
      }
      if (error) {
        console.error("signIn error:", error.message, error);
        throw new Error(error.message);
      }
      console.log("signIn success:", data);
      return { success: true, data };
    } catch (error) {
      console.error("signIn unexpected error:", error.message, error);
      return { success: false, error };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      console.log("signOut success");
      setUser(null);
    } catch (error) {
      console.error("signOut error:", error.message, error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};
