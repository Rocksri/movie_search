import { Link } from "react-router-dom";
import { RxDoubleArrowRight } from "react-icons/rx";

export default function PageHeader() {
    return (
        <header className="header flex">
            <h1 className="text-3xl">Logo</h1>
            <div className="flex nav_control">
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
                <div className="flex">
                    <h1 className="text-3xl">Movie</h1>
                    <span>
                        <RxDoubleArrowRight />
                    </span>
                </div>
            </div>
        </header>
    );
}
