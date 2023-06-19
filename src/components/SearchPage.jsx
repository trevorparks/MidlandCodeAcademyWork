import React, {useState} from 'react';
import Button from "../styled/elements/Button.js";
import getGifs from '../functions/getGifs.js';
import { useQuery } from 'react-query';
import { useSearchContext } from '../context/SearchContext.jsx';
import { useFavoritesContext } from '../context/FavoritesContext.jsx';
import GifDisplay from "../components/GifDisplay.jsx"



// const baseUrl = "https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&limit=25";
// const url = "https://api.giphy.com/v1/gifs/search?api_key=QLjcxO7Hoya1ek7UtqSc0FH0wabj5zVD&q=&limit=25&offset=0&rating=g&lang=en"

const SearchPage = () => {
  const key = process.env.GIPHY_API_KEY
  // This hook uses state management AND hooks
  const [searchTerm, setSearchTerm] = useState('');
  const [url, setUrl] = useState(null);
  const [rating, setRating] = useState('g');
  const { searchResults, setSearchResults } = useSearchContext();
  const {favorites, addFavorite, removeFavorite } = useFavoritesContext();



  const baseUrl = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&limit=25`;

const { isLoading, error, isSuccess } = useQuery(["getGifs", url], ()  => getGifs(url), {
  enabled: !!url,

  onSuccess: (data) => setSearchResults(data),
})

  return (
    <div>
    <h1>Search Page</h1>
    <form>
    <label>Find A Gif</label>
    <input
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Forrest Gump"
  />
  <select data-testid = "ratingInput"
  value= {rating}
  onChange={(e) => setRating(e.target.value)}
  >
    <option value='g'>G</option>
    <option value='pg'>PG</option>
    <option value='pg-13'>PG-13</option>
    <option value='r'>R</option>
  </select>
  <Button 
  disabled={searchTerm.length < 3}
  onClick={(e) => {
    e.preventDefault();
    if(searchTerm.length >=3 ) {
      setUrl(`&q=${searchTerm}&rating=${rating}`);
    }
    }}
    >
  Search</Button>
    </form>
    {isLoading && <p>Loading...</p>}
    {error && <p>An error has occured: {error.message}</p>}
    {isSuccess && 
    searchResults.map((val) => (
      <GifDisplay 
      key={val.gif_id}
      {...val}
      // url={val.url}
      // title={val.title}
      // gif_id={val.gif_id}
      addFavorite={() => addFavorite( {gif_id: val.gif_id, url: val.url, title: val.title} )}
      removeFavorite={removeFavorite}
      isFavorite={favorites.some((fav) => fav.gif_id === val.gif_id)}
      />
    ))
    }


 </div>
  )

}
export default SearchPage;

