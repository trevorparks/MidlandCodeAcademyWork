const baseURL = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&limit=25`;

export default async function getGifs(searchString) {
    const response = await fetch(baseURL + searchString);
    
    if(!response.ok) {
        throw new Error(`HTTP error! status ${response.status}`)
    }
    const data = await response.json();
    const gifs = data.data;
    return gifs.map((val) => ({
        gif_id: val.id,
        title: val.title,
        url: val.images.original.url
    }))
}