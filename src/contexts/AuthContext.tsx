import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import {
  storageUserGet,
  storageUserRemoved,
  storageUserSave,
} from "@storage/storageUser";
import { createContext, ReactNode, useEffect, useState } from "react";

export interface AuthContextDataProps {
  user: UserDTO;
  singIn: (email: string, password: string) => Promise<void>;
  isLoadingStorageUserData: boolean;
  signOut: () => void;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState({} as UserDTO);

  const [isLoadingStorageUserData, setIsLoadingStorageUserData] =
    useState(true);

  const singIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post("/sessions", {
        email,
        password,
      });
      if (data?.user) {
        setUser(data.user);
        storageUserSave(data.user);
      }
    } catch (err) {
      throw err;
    }
  };

  const loadUserData = async () => {
    try {
      const userLog = await storageUserGet();

      if (!!userLog) {
        setUser(userLog);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingStorageUserData(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoadingStorageUserData(true);
      setUser({} as UserDTO);
      await storageUserRemoved();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingStorageUserData(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        singIn,
        isLoadingStorageUserData,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
