// src/pages/Logout.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/context/auth/useAuth";
import { logoutUser } from "@/services/auth.api";

export default function Logout() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const doLogout = async () => {
      try {
        await logoutUser();
        setUser(null);
      } catch (err) {
        console.error("Logout failed:", err);
      } finally {
        navigate("/");
      }
    };
    doLogout();
  }, [navigate, setUser]);

  return null; // ga usah render apa-apa
}
