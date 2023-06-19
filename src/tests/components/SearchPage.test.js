//! Test functionality of Search Term, has to be > 3 char
//! Test functionality of Rating
//! Test functionality of submit button, url
//! Test loading and error instances
//! Test functionality of add favorite, remove favorite, isFavorite
//! Mock a successful search with all 3 parameters being input
import React, { useState, useContext } from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useQuery } from "react-query";
import { useSearchContext } from '../../context/SearchContext.jsx';
import { useFavoritesContext } from '../../context/FavoritesContext.jsx';
import SearchPage from '../../components/SearchPage';
jest.mock('../../context/SearchContext', () => ({
    useSearchContext: () => ({
        searchResults: [],
        setSearchResults: jest.fn(),
        searchTerm: 'test',
        setSearchTerm: jest.fn(),
        rating: 'g',
        setRating: jest.fn(),
        url: '',
        setUrl: jest.fn(),
    }),
}));

jest.mock('../../context/FavoritesContext', () => ({
    useFavoritesContext: () => ({
        favorites: [],
        addFavorite: jest.fn(),
        removeFavorite: jest.fn(),
        isFavorite: jest.fn(),
    }),
}));

jest.mock('react-query', () => ({
    ...jest.requireActual('react-query'),
    useQuery: jest.fn(),
}));


describe('Search Page', () => {
    it( 'should set the url', () => {
        // Mock the useState hook to capture the url
        const useStateSpy = jest.spyOn(React, 'useState');
        const setUrl = jest.fn();
        // When useState is called, it returns an array where
        // the first element is the initial value and the second
        // is the setUrl mock function
        useStateSpy.mockImplementation(() => [
            console.log("initial value"),
            "initial value", // initial state value
            setUrl // mocked setState function
        ]);

        useQuery.mockReturnValue({
            isLoading: false,
            error: null,
            isSuccess: true,
            data: [
                {
                    gif_id: '123',
                    title: 'funny cat',
                    url: 'https://giphy.com/gifs/funny-cat',
                },
            ],
        });

        const { getByPlaceholderText, getByText } = render(
            <SearchPage />
        );
        const searchInput = getByPlaceholderText('Forrest Gump');
        const searchButton = getByText('Search');

        fireEvent.change(searchInput, { target: { value: 'funny cat' } });
        fireEvent.click(searchButton);

        expect(setUrl).toHaveBeenCalled();
    });
});