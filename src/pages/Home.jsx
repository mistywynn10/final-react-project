import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import './Home.css';
import Navbar from '../components/Navbar';

const Home = () =>{
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const searchMovies = (event) => {
        event.preventDefault();

        if(!search.trim()) {
            return;
        }

        const searchTerm = search.trim();

        setLoading(true);

        setTimeout(() => {
            navigate(`/movies?search=${encodeURIComponent(searchTerm)}`);
        }, 1000);
    };

  return (
    <div className="home">
        <Navbar />
        <header className="home__banner">
            <h1>Find Movies You'll Love</h1>
        </header>
        <section className="home__search-section">
            <form className="home__search" onSubmit={searchMovies}>
                <input
                type="text"
                placeholder="Search for a movie..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                />
                <button
                className="home__search-button"
                type="submit"
                disabled={loading}
                >
                {loading ? (
                    <div className="spinner"></div>
                ) : (
                <HiMagnifyingGlass size={28} />
                )}
                </button>
            </form>
        </section>
    </div>
  )
}

export default Home;
