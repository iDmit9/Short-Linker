import {createContext} from 'react'

function func() {}

type ContextState = { 
  token: null | string,
  userId: null | string,
  login: (jwtToken: string, id: string, expDate: any) => void,
  logout: () => void,
  isAuthenticated: boolean,
  expiredAt: any
};

export const AuthContext = createContext<ContextState>({
  token: null,
  userId: null,
  login: func,
  logout: func,
  isAuthenticated: false,
  expiredAt: 0
})