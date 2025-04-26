import axios from "axios";

const API_KEY = "7b4da2a9";
const BASE_URL = "https://www.omdbapi.com/";

export const searchMovies = async (
    searchTerm,
    page = 1,
    type = "",
    year = ""
) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                apikey: API_KEY,
                s: searchTerm,
                page,
                type,
                y: year,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch movies");
    }
};

export const getMovieDetails = async (id) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                apikey: API_KEY,
                i: id,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch movie details");
    }
};
