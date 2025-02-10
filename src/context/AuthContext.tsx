import { SigningResponse } from '../types/user.type';
import { createContext } from 'react';

export interface AuthContextProps {
  auth?: SigningResponse;
  isLoggedIn: boolean;
  handleLogin: (auth: SigningResponse) => void;
  handleLogout: (error?: string) => void;
  loadingAuth: boolean;
  errorText: string;
}

export const AuthContext = createContext<AuthContextProps>({
  auth: {} as SigningResponse,
  isLoggedIn: false,
  handleLogin: () => {},
  handleLogout: () => {},
  loadingAuth: false,
  errorText: '',
});
