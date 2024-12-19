import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function useLogout() {
    const { setIsLoggedIn } = useAuth();
    const navigate = useNavigate();

    const logout = async () => {
        try {
            const response = await fetch("/logout", {
                method: "POST",
                credentials: "include",
            });

            if (response.ok) {
                setIsLoggedIn(false); // Update global state
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

    return logout;
}

export default useLogout;
