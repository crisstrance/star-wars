import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Footer = () => {
	const { store } = useContext(Context)
	
	return (
		<footer className="footer mt-auto py-3 text-center ">
			<p className="text-light">
				Made by {store.owner} . . . This web is under contruction <i className="fas fa-tools"></i>
			</p>
		</footer>
	)
};
