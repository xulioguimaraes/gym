import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from "@storage/storageAuthToken";
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
  updateUserProfile: (user: UserDTO) => Promise<void>;
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

  const userAndTokenUpdate = (userData: UserDTO, token: string) => {
    try {
      api.defaults.headers.common["Authorization"] = "Bearer " + token;

      setUser(userData);
    } catch (error) {
      throw error;
    }
  };

  const storageUserAndTokenSave = async (userData: UserDTO, token: string) => {
    setIsLoadingStorageUserData(true);

    try {
      await storageAuthTokenSave(token);
      await storageUserSave(userData);
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingStorageUserData(false);
    }
  };

  const singIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post("/sessions", {
        email,
        password,
      });
      if (data?.user && data?.token) {
        setIsLoadingStorageUserData(true);
        storageUserAndTokenSave(data.user, data.token);
        userAndTokenUpdate(data.user, data.token);
      }
    } catch (err) {
      throw err;
    }
  };

  const loadUserData = async () => {
    try {
      setIsLoadingStorageUserData(true);

      const userLog = await storageUserGet();
      const token = await storageAuthTokenGet();

      if (!!userLog && !!token) {
        userAndTokenUpdate(userLog, token);
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
      await storageAuthTokenRemove();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingStorageUserData(false);
    }
  };

  const updateUserProfile = async (userUpdate: UserDTO) => {
    try {
      setUser(userUpdate);
      await storageUserSave(userUpdate);
    } catch (error) {
      throw error;
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
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
