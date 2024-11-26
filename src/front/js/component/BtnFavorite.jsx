import React, { useContext } from "react";
import { Context } from "../store/appContext.js";



export const BtnFavorite = () => {
    const { store, actions } = useContext(Context)


    return (
        <li className="nav-item">
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Favorites
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">{store.favorites.length}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-lg-end">
                    {store.favorites.map((item, index) =>
                        <li key={index} className="dropdown-item d-flex justify-content-between">
                            <p className="d-flex justify-content-start">{item.name} - {item.type} </p>
                            <span className="d-flex justify-content-end" onClick={() => actions.removeFavorite(item)} > <i className="fas fa-trash-alt text-danger"></i></span>
                        </li>
                    )}

                </ul>
            </div>
        </li >
    )
}