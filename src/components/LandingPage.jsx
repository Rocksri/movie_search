import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { searchMovies } from "../services/api";
import MovieCard from "./MovieCard";
import "./LandingPage.css";

const LandingPage = () => {
    const [trendingMovies, setTrendingMovies] = useState([]);

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const result = await searchMovies("movie", 1);
                setTrendingMovies(result.Search?.slice(0, 8) || []);
            } catch (error) {
                console.error("Error fetching trending movies:", error);
            }
        };
        fetchTrending();
    }, []);

    return (
        <div className="landing-container">
            <nav className="landing-nav">
                <Link to="/" className="logo">
                    CineVerse
                </Link>
                <div className="nav-links">
                    <Link to="/search">Search</Link>
                    <Link to="/movies">Movies</Link>
                </div>
            </nav>

            <div className="hero-section">
                <div className="hero-content">
                    <h1>Welcome to CineVerse</h1>
                    <p>Discover your next favorite movie or series</p>
                    <div className="search-container">
                        <Link to="/search" className="cta-button">
                            Explore Now
                        </Link>
                    </div>
                </div>
            </div>

            <section className="trending-section">
                <h2>Trending Now</h2>
                <div className="movies-grid">
                    {trendingMovies.map((movie) => (
                        <MovieCard key={movie.imdbID} movie={movie} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
