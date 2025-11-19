'use client';
import { createContext, useContext, useState, useEffect, useCallback, use } from "react"; 

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user data on initial mount
  const loadUser = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/me', {
        method: 'GET',
        credentials: 'include'
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData.user);
      } else {
        setUser(null);
      } 
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null);
    }finally {
    setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // Login function
  const login = async (email, password) => {
      try {
          const response = await fetch('/api/auth/login', {
              method: 'POST',
              credentials: 'include',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(email, password)
          });
          if (response.ok) {
              const userData = await response.json();
              setUser(userData.user);
              return { success: true };
          }
          const errorData = await response.json();
          return { success: false, error: errorData.error };
      } catch (error) {
          console.error("Login error:", error);
          return { success: false, error: "Network error" };
      }
  };

  // Registration function
  const register = async (payload) => {
      try {
          const response = await fetch('/api/auth/register', {
              method: 'POST', 
              credentials: 'include',
              headers: {
                  'Content-Type': 'application/json'
              },  
              body: JSON.stringify(details)
          });
          if (response.ok) {
              const userData = await response.json();
              setUser(userData.user);
              return { success: true };
          }
          const errorData = await response.json();
          return { success: false, error: errorData.error };
      } catch (error) {
          console.error("Registration error:", error);
          return { success: false, error: "Network error" };
      }
  };

  // Logout function
  const logout = async () => {
      try {
          const response = await fetch('/api/auth/logout', {
              method: 'POST',
              credentials: 'include'
          });
          if (response.ok) {
              setUser(null);
              return { success: true };
          }
          const errorData = await response.json();
          return { success: false, error: errorData.error };
      } catch (error) {
          console.error("Logout error:", error);
          return { success: false, error: "Network error" };
      }
  };
  
  return (
    <AuthContext.Provider value={{ 
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user
      }}>
      {children}
    </AuthContext.Provider>
  );
}

