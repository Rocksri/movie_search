import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchMovies } from "../services/api";
import MovieCard from "./MovieCard";
import "./SearchPage.css";

const SearchPage = () => {
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
            if (!searchTerm.trim()) {
                setMovies([]);
                setTotalPages(0);
                return;
            }

            setIsLoading(true);
            setError("");

            try {
                let result;

                // Handle single-letter searches
                if (searchTerm.length === 1) {
                    const [page1, page2] = await Promise.all([
                        searchMovies(searchTerm, 1, selectedType),
                        searchMovies(searchTerm, 2, selectedType),
                    ]);

                    const combinedResults = [
                        ...(page1.Search || []),
                        ...(page2.Search || []),
                    ];

                    // Sort and limit to 20 results
                    const sortedResults = combinedResults
                        .sort((a, b) => a.Title.localeCompare(b.Title))
                        .slice(0, 20);

                    result = {
                        Search: sortedResults,
                        totalResults: sortedResults.length,
                    };
                } else {
                    result = await searchMovies(
                        searchTerm,
                        currentPage,
                        selectedType
                    );
                    if (result.Error) throw new Error(result.Error);
                }

                setMovies(result.Search || []);
                setTotalPages(Math.ceil(result.totalResults / 10));
            } catch (err) {
                handleApiError(err);
                setMovies([]);
            }
            setIsLoading(false);
        };

        const debounceTimer = setTimeout(fetchMovies, 500);
        return () => clearTimeout(debounceTimer);
    }, [searchTerm, currentPage, selectedType]);

    const handleApiError = (error) => {
        if (error.message.includes("Too many results")) {
            setError("Please refine your search query");
        } else {
            setError(error.message);
        }
    };

    const handleTypeChange = (type) => {
        setSelectedType(type);
        setCurrentPage(1);
    };

    return (
        <div className="search-page">
            <header className="search-header">
                <div className="nav-container">
                    <Link to="/" className="home-button">
                        Home
                    </Link>
                    <div className="search-controls">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            placeholder="Search movies, series..."
                            className="search-input"
                        />
                        <select
                            value={selectedType}
                            onChange={(e) => handleTypeChange(e.target.value)}
                            className="type-select"
                        >
                            <option value="">All Types</option>
                            <option value="movie">Movies</option>
                            <option value="series">Series</option>
                            <option value="episode">Episodes</option>
                        </select>
                    </div>
                </div>
            </header>

            <main className="search-main">
                {isLoading && <div className="loading">Searching...</div>}

                {error && <div className="error-message">{error}</div>}

                {searchTerm.length === 1 && movies.length > 0 && (
                    <div className="info-message">
                        Showing top 20 results sorted alphabetically for "
                        {searchTerm}"
                    </div>
                )}

                {movies.length > 0 ? (
                    <>
                        <div className="movies-grid">
                            {movies.map((movie) => (
                                <MovieCard key={movie.imdbID} movie={movie} />
                            ))}
                        </div>

                        {searchTerm.length > 1 && totalPages > 1 && (
                            <div className="pagination">
                                <button
                                    onClick={() =>
                                        setCurrentPage((p) =>
                                            Math.max(1, p - 1)
                                        )
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
                                        setCurrentPage((p) =>
                                            Math.min(totalPages, p + 1)
                                        )
                                    }
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    !isLoading &&
                    !error &&
                    searchTerm && (
                        <div className="empty-state">
                            <h2>No results found for "{searchTerm}"</h2>
                            <p>Try different keywords or check your spelling</p>
                        </div>
                    )
                )}
            </main>
        </div>
    );
};

export default SearchPage;
