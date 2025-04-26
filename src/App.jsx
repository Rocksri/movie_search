import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import SearchPage from "./components/SearchPage";
import MoviePage from "./components/MoviePage";
import MovieDetails from "./components/MovieDetails";
import "./App.css";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/movies" element={<MoviePage />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
            </Routes>
        </Router>
    );
}

export default App;
