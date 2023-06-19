import React, {
    useReducer,
    useContext,
    createContext,
    useCallback,
  } from "react";
  import {
    CLEAR_SEARCH,
    INITIAL_SEARCH_STATE,
    searchReducer,
    SET_SEARCH,
  } from "../reducers/searchReducer";
  
  const SearchContext = createContext(null);
  
  export function useSearchContext() {
    return useContext(SearchContext);
  }
  
  export function SearchProvider(props) {
    const [searchResults, dispatch] = useReducer(
      searchReducer,
      INITIAL_SEARCH_STATE
    );
  
    const setSearchResults = useCallback(
      (searchResults) => {
        dispatch({ type: SET_SEARCH, payload: searchResults });
      },
      [dispatch]
    );
  
    const clearSearchResults = useCallback(() => {
      dispatch({ type: CLEAR_SEARCH });
    }, [dispatch]);
  
    return (
      <SearchContext.Provider
        value={{ searchResults, clearSearchResults, setSearchResults, useSearchContext }}
      >
        {props.children}
      </SearchContext.Provider>
    );
  }