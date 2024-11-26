import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import swimage from "../../img/star-wars-logo.png";
import { BtnFavorite } from "./BtnFavorite.jsx";

export const Navbar = () => {
	const { store } = useContext(Context);
	const navigate = useNavigate()
	const handleLogin = () => {
		navigate('/login')
	}

	return (
		<nav className="navbar text-bg-dark">
			<div className="container-fluid d-flex justify-content-between mx-md-4 mt-4 mb-1">
				<div className="">
					<Link to="/">
						<img height="55" src={swimage} />
					</Link>
				</div>
				<div>
					<ul className="nav ms-auto mb-2 mb-lg-0">
						<li className="nav-item"><Link className="nav-link link-secondary" to="/characters"> Characters</Link></li>
						<li className="nav-item"><Link className="nav-link link-secondary" to="/planets">Planets</Link></li>
						<li className="nav-item"><Link className="nav-link link-secondary" to="/starships">Starships</Link></li>
						<li className="nav-item"><Link className="nav-link link-secondary" to="/contacts">Contacts</Link></li>
						<li className="nav-item btn btn-success me-2"><Link className="nav-link link-light " to="/login">Login</Link></li>
						<BtnFavorite />
					</ul>

				</div>

			</div>
		</nav>
	);
};
