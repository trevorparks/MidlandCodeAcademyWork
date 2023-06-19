import React, { createContext, useCallback, useContext, useReducer } from 'react';
import {
  INITIAL_USER_STATE,
  SET_USER,
  CLEAR_USER,
  userReducer
} from "../reducers/userReducer";

const UserContext = createContext(null);

export const useUserContext = () => {
  return useContext(UserContext);
}

export const UserProvider = (props) => {
  const [user, dispatch] = useReducer(userReducer, INITIAL_USER_STATE);

  const setUser = useCallback(
    (user) => dispatch({ type: SET_USER, payload: user }),
    [dispatch]
  );

  const clearUser = useCallback(() => {
    dispatch({ type: CLEAR_USER });
  }, [dispatch]
  );

  return (
    <UserContext.Provider value={{ user, setUser, clearUser }}>
      {props.children}
    </UserContext.Provider>
  )
}