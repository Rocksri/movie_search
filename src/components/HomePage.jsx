// components/HomePage.js (fixed search)
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchMovies } from "../services/api";
import MovieCard from "./MovieCard";
import "../styles/HomePage.css";

const HomePage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedType, setSelectedType] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            if (!searchTerm) return;

            setIsLoading(true);
            setError("");
            try {
                const result = await searchMovies(
                    searchTerm,
                    currentPage,
                    selectedType
                );
                if (result.Error) throw new Error(result.Error);

                setMovies(result.Search || []);
                setTotalPages(Math.ceil(result.totalResults / 10));
            } catch (err) {
                setError(err.message);
                setMovies([]);
            }
            setIsLoading(false);
        };

        fetchMovies();
    }, [searchTerm, currentPage, selectedType]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;
        setCurrentPage(1);
        navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    };
    
    // Add debounce for search
    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            if (searchTerm.trim()) {
                fetchMovies();
            } else {
                setMovies([]);
                setTotalPages(0);
            }
        }, 500);

        return () => clearTimeout(debounceTimer);
    }, [searchTerm, currentPage, selectedType]);

    const fetchMovies = async () => {
        setIsLoading(true);
        setError("");
        try {
            const result = await searchMovies(
                searchTerm,
                currentPage,
                selectedType
            );
            if (result.Error) throw new Error(result.Error);

            setMovies(result.Search || []);
            setTotalPages(Math.ceil(result.totalResults / 10));
        } catch (err) {
            setError(err.message);
            setMovies([]);
        }
        setIsLoading(false);
    };

    return (
        <div className="home-page">
            <header className="search-header">
                <Link to="/" className="home-link">
                    CineVerse
                </Link>
                <form onSubmit={handleSubmit} className="search-form">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search movies, series, episodes..."
                    />
                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="movie">Movies</option>
                        <option value="series">Series</option>
                        <option value="episode">Episodes</option>
                    </select>
                    <button type="submit">Search</button>
                </form>
            </header>

            {error && <div className="error-message">{error}</div>}
            {isLoading && <div className="loading">Loading...</div>}

            <div className="movies-grid">
                {movies.map((movie) => (
                    <MovieCard key={movie.imdbID} movie={movie} />
                ))}
            </div>

            {movies.length === 0 && !isLoading && !error && (
                <div className="empty-state">
                    <h2>Nothing to show yet</h2>
                    <p>Start by searching for your favorite movies or series</p>
                </div>
            )}

            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        onClick={() =>
                            setCurrentPage((p) => Math.max(1, p - 1))
                        }
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() =>
                            setCurrentPage((p) => Math.min(totalPages, p + 1))
                        }
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default HomePage;
