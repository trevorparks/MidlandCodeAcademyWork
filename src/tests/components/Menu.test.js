//! Test to see if buttons render?


import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useUserContext } from '../../context/UserContext';
import Menu from '../../components/Menu';
import { useFavoritesContext } from '../../context/FavoritesContext';
import { useSearchContext } from '../../context/SearchContext';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../../context/UserContext', () => ({
    useUserContext: jest.fn(),
}));
jest.mock('../../context/SearchContext', () => ({
    useSearchContext: jest.fn(),
}));
jest.mock('../../context/FavoritesContext', () => ({
    useFavoritesContext: jest.fn(),
}));

describe('Menu', () => {

    beforeEach(() => {
        useUserContext.mockReturnValue({
           user: 'username',
            setUser: jest.fn(),
            clearUser: jest.fn(),
        })

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
    })
    it('should display a login button if there is no user', () => {

                useUserContext.mockReturnValue({
                    user: null,
                    setUser: jest.fn(),
                    clearUser: jest.fn(),
                });

        const { getByText } = render(
            <BrowserRouter>
                <Menu />
            </BrowserRouter>
        );
        const loginLink = getByText('Login');
        // Checks if the login link is in the document
        expect(loginLink).toBeInTheDocument();
    });
    
    });
