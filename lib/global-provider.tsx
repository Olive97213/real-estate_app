import { useAppwrite } from '@/lib/useAppwrite';
import { createContext, ReactNode, useContext } from 'react';
import { getCurrentUser } from './appwrite';

interface User {
  $id: string;
  name: string;
  email: string;
  avatar: string;
}

interface GlobalContextType {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  refetch: (newParams?: Record<string, string | number>) => Promise<void>;
}

// 1️⃣ Crée le context avec undefined par défaut
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

// 2️⃣ Composant provider
export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  // 3️⃣ Utilisation de ton hook custom useAppwrite
  const { data: user, loading, refetch } = useAppwrite({ fn: getCurrentUser });

  const isLoggedIn = !!user;

  console.log(JSON.stringify(user, null, 2));

  return (
    <GlobalContext.Provider value={{ isLoggedIn, user, loading, refetch }}>
      {children}
    </GlobalContext.Provider>
  );
};

// 4️⃣ Hook pour consommer le context facilement
export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};

export default GlobalProvider;
