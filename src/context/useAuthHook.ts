import { SigningResponse } from '../types/user.type';
import { useEffect, useState } from 'react';

export const useAuthHook = () => {
  const [auth, setAuth] = useState<SigningResponse>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [errorText, setError] = useState('');

  const handleAuth = () => {
    setLoadingAuth(true);
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    if (auth?.accessToken) {
      setAuth(auth);
      setIsLoggedIn(true);
      setError('');
    }
    setLoadingAuth(false);
  };

  const handleLogin = (auth: SigningResponse) => {
    setAuth(auth);
    setIsLoggedIn(true);
    localStorage.setItem('auth', JSON.stringify(auth));
  };

  const handleLogout = (error = '') => {
    setError(error);
    setAuth(undefined);
    setIsLoggedIn(false);
    localStorage.clear();
  };

  useEffect(() => {
    handleAuth();
  }, []);

  return {
    auth,
    isLoggedIn,
    handleLogin,
    handleLogout,
    loadingAuth,
    errorText,
  };
};
