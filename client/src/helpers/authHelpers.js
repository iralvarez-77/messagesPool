import { createContext, useContext } from "react";

export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const MessageContext = createContext()

export const useMessage = () =>  useContext(MessageContext)