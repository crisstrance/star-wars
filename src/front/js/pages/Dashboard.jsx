import React, { useContext }from "react";
import { Context } from "../store/appContext.js";

export const Dashboard = () => {
    const { actions } = useContext(Context)
    const handleOnClick = () => {

    }

	return (
		<div className="text-center mt-5">
			<h1 className="text-light"> DASHBOARD </h1>
            <button className="btn btn-warning" onClick={handleOnClick}>
                Acceso a Protected
            </button>
		</div>
	);
};