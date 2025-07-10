
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
} from 'react';


import { auth } from '../services/firebase';
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

const AuthContext = createContext({
  user:    /** @type {import('firebase/auth').User|null} */ (null),
  loading: true,
  login:   async () => {},
  logout:  async () => {},
});

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    const result   = await signInWithPopup(auth, provider);
    const email    = result.user.email || '';
    if (!email.endsWith('@aconacademy.ca')) {
      await signOut(auth);
      throw new Error('Please sign in with an @aconacademy.ca account.');
    }
    return result.user;
  };

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
