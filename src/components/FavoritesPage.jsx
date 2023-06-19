import React, { useEffect } from 'react';
import GifDisplay from './GifDisplay';
import { useFavoritesContext } from '../context/FavoritesContext';



const FavoritesPage = (isFavorite) => {

    const {favorites, removeFavorite} = useFavoritesContext();
    useEffect(() => {
    console.log(favorites)
    }, [favorites]);

    return (
        <>
        <h1>Favorites</h1>
        {favorites.map((val) => {
            return(
            <GifDisplay
            key={val.gif_id}
             url={val.url}
            title={val.title}
             gif_id={val.gif_id}
            isFavorite={true} 
            removeFavorite={removeFavorite}
            />
            )
        })}
        
        </>
    )
};
export default FavoritesPage;
