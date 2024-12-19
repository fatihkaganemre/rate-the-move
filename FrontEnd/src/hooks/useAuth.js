import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

function useAuth() {
    const { setIsLoggedIn } = useAuthContext();
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

    function login(input) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({username: input.email, password: input.password})
        };
    
        fetch('/login', requestOptions)
          .then(response => response.json())
          .then(() => { 
            setIsLoggedIn(true);
            navigate("/moves");
          })
          .catch((error) => alert(error.message))
      }
    
      function register(input) {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(input)
        };
    
        fetch('/register', requestOptions)
          .then(response => response.json())
          .then(() => { 
            setIsLoggedIn(true);
            navigate("/moves");
          })
          .catch((error) => alert(error))
      }

    return { logout, login, register } ;
}

export default useAuth;
