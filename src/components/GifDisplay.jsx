

const GifDisplay = ({ url, title, gif_id, addFavorite, removeFavorite, isFavorite }) => {
    
    return (
        <div>
            <h4>
                {title}
            </h4>
            <img src={url} alt={title} title={title} />
            { !isFavorite &&(<button onClick={() => addFavorite(gif_id, url, title)}>
                Add Favorite
            </button>)}
            { isFavorite && (<button onClick={() => removeFavorite(gif_id)}>
                Remove Favorite
            </button>) }
        </div>
    )
}

export default GifDisplay;