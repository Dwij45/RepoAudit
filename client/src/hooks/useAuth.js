import { useState } from "react";

// Central auth state — swap localStorage / JWT logic here when wiring to a real backend
const useAuth = () => {
  const [authed, setAuthed]   = useState(false);
  const [token,  setToken]    = useState(null);

  const login  = (jwt) => { setToken(jwt); setAuthed(true);  };
  const logout = ()    => { setToken(null); setAuthed(false); };

  return { authed, token, login, logout, setAuthed };
};

export default useAuth;