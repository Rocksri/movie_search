import { useState, useEffect } from "react";
import { searchMovies } from "../services/api";
import MovieCard from "./MovieCard";
import "./MoviePage.css";
import { Link } from "react-router-dom";

const MoviePage = () => {
    const [movies, setMovies] = useState([]);
    const [filters, setFilters] = useState({
        type: "movie",
        year: new Date().getFullYear(),
        sort: "year",
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const result = await searchMovies(
                    "movie",
                    currentPage,
                    filters.type,
                    filters.year
                );

                if (result.Error) throw new Error(result.Error);
                const sorted = sortMovies(result.Search, filters.sort);
                setMovies(sorted);
                setTotalPages(Math.ceil(result.totalResults / 10));
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchMovies();
    }, [filters, currentPage]);

    const sortMovies = (movies, sortBy) => {
        return [...movies].sort((a, b) => {
            if (sortBy === "year") return b.Year.localeCompare(a.Year);
            if (sortBy === "title") return a.Title.localeCompare(b.Title);
            return 0;
        });
    };

    return (
        <div className="movie-page">
            <div className="page-header">
                <Link to="/" className="home-button">
                    Home
                </Link>
                <h1>Movie Browser</h1>
            </div>
            <div className="filters">
                <select
                    value={filters.type}
                    onChange={(e) =>
                        setFilters({ ...filters, type: e.target.value })
                    }
                >
                    <option value="movie">Movies</option>
                    <option value="series">Series</option>
                </select>

                <input
                    type="number"
                    value={filters.year}
                    onChange={(e) =>
                        setFilters({ ...filters, year: e.target.value })
                    }
                    placeholder="Year"
                    min="1900"
                    max={new Date().getFullYear()}
                />

                <select
                    value={filters.sort}
                    onChange={(e) =>
                        setFilters({ ...filters, sort: e.target.value })
                    }
                >
                    <option value="year">Newest First</option>
                    <option value="title">Sort by Title</option>
                </select>
            </div>

            <div className="movies-grid">
                {movies.map((movie) => (
                    <MovieCard key={movie.imdbID} movie={movie} />
                ))}
            </div>

            <div className="pagination">
                <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
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
        </div>
    );
};

export default MoviePage;
