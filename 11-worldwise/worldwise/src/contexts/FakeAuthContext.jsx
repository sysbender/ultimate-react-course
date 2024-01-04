// Importing necessary modules from React
import { useContext, createContext, useReducer } from "react";

// Creating a new context for authentication information
const AuthContext = createContext();

const FAKE_USER = {
  name: "JackMa",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const initialState = {
  user: null,
  isAuthenticated: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return initialState;
    default:
      throw new Error(`Action type is not valid : ${action.type}`);
  }
}
// Component: AuthProvider
// This component provides the AuthContext to its children
function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  // Rendering the AuthContext.Provider with its children
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom Hook: useAuth
// This hook is used to conveniently access the AuthContext
function useAuth() {
  // Using the useContext hook to get the current value of AuthContext
  const context = useContext(AuthContext);

  // If the context is undefined, it means useAuth was used outside of AuthProvider
  // Throwing an error to indicate the misuse
  if (context === undefined)
    throw new Error("useAuth must be used within an AuthProvider");
  console.log("context==", context);

  // Returning the context, which contains authentication-related information
  return context;
}

export { AuthProvider, useAuth };
