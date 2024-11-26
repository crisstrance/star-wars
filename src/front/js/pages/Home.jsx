import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { ContextExample } from "../component/ContentExample.jsx"
import { AddCard } from "./AddCard.jsx"
import rigoImageUrl from "../../img/rigo-baby.jpg";
import swland from "../../img/star-wars-back0.jpg";
import "../../styles/home.css";
import { Spinner } from "../component/Spinner.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			{/* <ContextExample /> */}
			<div className="container">

				<img src={swland} className="img-fluid " alt="Star War"></img>
			</div>

		</div>
	);
};
