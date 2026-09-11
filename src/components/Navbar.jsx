import { Link } from "react-router-dom";
import { MdLocalMovies } from "react-icons/md";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <MdLocalMovies />
        <span>MovieFinder</span>
      </div>

      <ul className="navbar__links">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/movies">Movies</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;