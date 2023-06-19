import React, {
    useReducer,
    useContext,
    createContext,
    useCallback,
  } from "react";
  import {
    ADD_FAVORITE,
    CLEAR_FAVORITES,
    favoritesReducer,
    INITIAL_FAVORITES_STATE,
    REMOVE_FAVORITE,
  } from "../reducers/favoritesReducer";
  
  const FavoritesContext = createContext(null);
  
  export function useFavoritesContext() {
    return useContext(FavoritesContext);
  }
  
  export function FavoritesProvider(props) {
    const [favorites, dispatch] = useReducer(
      favoritesReducer,
      INITIAL_FAVORITES_STATE
    );
  
    const addFavorite = useCallback(
      (gif) => {
        dispatch({ type: ADD_FAVORITE, payload: gif });
      },
      [dispatch]
    );
  
    const removeFavorite = useCallback(
      (gif_id) => {
        dispatch({ type: REMOVE_FAVORITE, payload: gif_id });
      },
      [dispatch]
    );
  
    const clearFavorites = useCallback(() => {
      dispatch({ type: CLEAR_FAVORITES });
    }, [dispatch]);
  
    return (
      <FavoritesContext.Provider
        value={{ favorites, addFavorite, removeFavorite, clearFavorites }}
      >
        {props.children}
      </FavoritesContext.Provider>
    );
  }
  