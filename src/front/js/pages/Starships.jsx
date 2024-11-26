import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { Spinner } from "../component/Spinner.jsx";


export const Starships = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate();

    return (
        <div className="container">
            <h1 className="text-light">Starships</h1>
            {store.starships.length === 0 ? <Spinner /> :
                <div className="row">
                    {store.starships.map((item) => (
                        <div key={item.uid} className="card text-bg-warning m-1 " style={{ width: '18rem', transition: 'transform 0.3s ease-in-out' }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                            <img
                                src={`https://starwars-visualguide.com/assets/img/starships/${item.uid}.jpg`}
                                onError={(e) => e.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg'}
                                className="card-img-top"
                                alt={item.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <div className="d-flex justify-content-between">
                                    <button className="btn btn-warning me-1"
                                        onClick={() => navigate(`/starships/${item.uid}`)}>Details</button>
                                    <button className="btn btn-light btn-outline-danger" onClick={() => actions.addFavorite({name: item.name, type: 'Starship'})}><i className="far fa-heart"></i></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
};