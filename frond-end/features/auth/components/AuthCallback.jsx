import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { supabase } from "../../../src/supabaseClient";

export const AuthCallback = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const handleCallback = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) {
        console.error("Callback error:", error);
        navigate("/");
        return;
      }
      if (session?.user) {
        setUser(session.user);
        navigate("/");
      } else {
        navigate("/");
      }
    };

    handleCallback();
  }, [navigate, setUser]);

  return <div>Đang xử lý xác nhận email...</div>;
};
