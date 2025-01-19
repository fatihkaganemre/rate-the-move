import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

function useAuth() {
  const { setUser, setIsLoggedIn } = useAuthContext();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setUser(null); // Clear user state
        setIsLoggedIn(false); // Update global login state
        localStorage.clear();
        sessionStorage.clear();
        navigate("/login");
      } else {
        console.error("Failed to log out:", await response.json());
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };

  const login = async (input) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: input.email,
          password: input.password,
        }),
        credentials: "include", // Ensure cookies are sent/received
      });

      if (!response.ok) throw new Error("Login failed");
      const data = await response.json();
      setUser(data.user); // Set user state globally
      setIsLoggedIn(true); // Update login state
      navigate("/moves");
    } catch (error) {
      console.error("Login failed:", error);
      alert(error.message);
    }
  };

  const register = async (input) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
        credentials: "include",
      });

      if (!response.ok) throw new Error("Registration failed");
      const data = await response.json();
      setUser(data.user); // Set user state globally
      setIsLoggedIn(true); // Update login state
      navigate("/moves");
    } catch (error) {
      console.error("Registration failed:", error);
      alert(error.message);
    }
  };

  return { logout, login, register };
}

export default useAuth;
