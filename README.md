# Movie Discovery App

This React application allows users to search for movies using the OMDB API. It provides features to browse search results, view detailed information about individual movies, and filter movies by type.

## Features

- **Movie Search:** Users can search for movies by title or keywords using a search bar.
- **Search Results:** Search results are displayed in a grid or list format, showing movie posters, titles, and brief descriptions.
- **Pagination:** Handles large sets of search results with pagination.
- **Detailed View:** Provides a dedicated page for each movie, displaying a larger poster, title, release year, genre, plot summary, ratings, and cast.
- **Type Filtering:** Allows users to filter search results by movie type (e.g., movie, series, episode) using a dropdown. This filtering is done via the API.
- **Navigation:** Uses React Router for seamless navigation between the search page and movie details page.
- **Error Handling:** Implements error handling for API requests and displays user-friendly messages for errors or no results.

## Technologies Used

- React
- React Router
- OMDB API

## Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd movie-discovery-app
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Obtain an OMDB API key:**
    - Visit the [OMDB API website](http://www.omdbapi.com/).
    - Sign up for a free API key.
5.  **Create a `.env.local` file in the project root and add your API key:**
    ```
    REACT_APP_OMDB_API_KEY=your_omdb_api_key
    ```
6.  **Start the development server:**
    ```bash
    npm start
    ```

## Important Notes

- This application interacts with the OMDB API to fetch movie data. Ensure you have a valid API key.
- The filtering of movie types is handled by making requests to the OMDB API with the `type` parameter.
