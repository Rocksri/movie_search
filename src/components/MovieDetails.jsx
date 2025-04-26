import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails } from "../services/api";
import "./MovieDetails.css";

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const data = await getMovieDetails(id);
                if (data.Error) throw new Error(data.Error);
                setMovie(data);
            } catch (err) {
                setError(err.message);
            }
            setLoading(false);
        };
        fetchMovie();
    }, [id]);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="movie-details">
            <div className="navigation-buttons">
                <Link to="/" className="home-button">
                    Home
                </Link>
                <Link to={-1} className="back-button">
                    ← Back
                </Link>
            </div>

            <div className="detail-content">
                <div className="poster">
                    <img src={movie.Poster} alt={movie.Title} />
                </div>

                <div className="info">
                    <h1>
                        {movie.Title} ({movie.Year})
                    </h1>
                    <div className="metadata">
                        <span>{movie.Runtime}</span>
                        <span>{movie.Genre}</span>
                        <span>IMDB: {movie.imdbRating}</span>
                    </div>

                    <p className="plot">{movie.Plot}</p>

                    <div className="details-grid">
                        <div className="detail-item">
                            <span>Director:</span>
                            <span>{movie.Director}</span>
                        </div>
                        <div className="detail-item">
                            <span>Cast:</span>
                            <span>{movie.Actors}</span>
                        </div>
                        <div className="detail-item">
                            <span>Awards:</span>
                            <span>{movie.Awards}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
