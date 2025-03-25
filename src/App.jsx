import { useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom"
  ;
import PageHeader from "./profile/profile";
import "./App.css";

function AppContent() {
    console.log("Check");
    return <PageHeader />;
}

export default function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}
