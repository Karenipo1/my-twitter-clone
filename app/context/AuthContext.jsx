'use client';
import { createContext, useContext, useState, useEffect, useCallback, use } from "react"; 

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}


export const AuthProvider = ({ children, initialUser = null }) => {
  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(!initialUser);

  // Load user data on initial mount
  const loadUser = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include'
      });

      if (response.ok) {
        const data  = await response.json();
        setUser(data .user);
      } else {
        setUser(null);
      } 
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null);
    }finally {
    setLoading(false);
    }
  },  []);

useEffect(() => {
  if (!initialUser) {
    loadUser();
  } else {
    setLoading(false);
  }
}, [initialUser, loadUser]);

  // Login function
  const login = async (email, password) => {
      try {
          const response = await fetch('/api/auth/login', {
              method: 'POST',
              credentials: 'include',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({email, password})
          });
          if (response.ok) {
              const data = await response.json();
              setUser(data.user);
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
              body: JSON.stringify(payload)
          });
          if (response.ok) {
              const data = await response.json();
              setUser(data.user);
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

