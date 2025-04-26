// components/MovieCard.js
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
    return (
        <div className="movie-card">
            <Link to={`/movie/${movie.imdbID}`}>
                <div className="poster-container">
                    <img
                        src={
                            movie.Poster !== "N/A"
                                ? movie.Poster
                                : "/placeholder.jpg"
                        }
                        alt={movie.Title}
                    />
                </div>
                <div className="movie-info">
                    <h3>{movie.Title}</h3>
                    <p>
                        {movie.Year} • {movie.Type}
                    </p>
                </div>
            </Link>
        </div>
    );
};

export default MovieCard;
