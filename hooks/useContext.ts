import { useContext } from 'react';
import { AuthContext } from '../context/Auth/AuthContext';
import { SgdContext } from '../context/App/SgdContext';

export const useAuth = () => useContext(AuthContext);
export const useSgd = () => useContext(SgdContext)
