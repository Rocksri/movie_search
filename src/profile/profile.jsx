import { Link } from "react-router-dom";
import { RxDoubleArrowRight } from "react-icons/rx";
import { VscThreeBars } from "react-icons/vsc";

export default function PageHeader() {
    return (
        <header className="header flex">
            <h1 className="text-3xl">Logo</h1>
            <div className="flex nav_control">
                <div className="menu-icon">
                    <VscThreeBars />
                </div>
                <nav>
                    <ul className="flex">
                        <li>
                            <Link>Home</Link>
                        </li>
                        <li>
                            <Link>Search</Link>
                        </li>
                        <li>
                            <Link>New Movies</Link>
                        </li>
                        <li>
                            <Link>My Orders</Link>
                        </li>
                    </ul>
                </nav>
                <div className="flex movie-hover-wrapper">
                    <h1 className="text-3xl movie-text">Movie</h1>
                    <span className="movie-icon">
                        <RxDoubleArrowRight />
                    </span>
                </div>
            </div>
        </header>
    );
}
