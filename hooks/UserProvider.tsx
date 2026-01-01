import { View, Text } from 'react-native';
import React, {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type UserType = {
  email: string;
  username: string;
  age: number;
  categories: string[];
  gender: string;
  user_id: string;
};

type ContextType = {
  userData: UserType;
  setUserData: Dispatch<SetStateAction<UserType>>;
  Authenticated: boolean;
  setAuthenticated: Dispatch<SetStateAction<boolean>>;
};

const UserContext = createContext<ContextType | undefined>(undefined);
export const useUser = (): ContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserType>({
    email: '',
    username: '',
    age: 0,
    categories: [],
    gender: '',
    user_id: '',
  });

  const [Authenticated, setAuthenticated] = useState<boolean>(false);

  return (
    <UserContext.Provider
      value={{ userData, setUserData, Authenticated, setAuthenticated }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
