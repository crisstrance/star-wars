import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../component/Spinner.jsx";


export const Planets = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate();


    return (
        <div className="container">
            <h1 className="text-light">Planets</h1>
            {store.planets.length === 0 ? <Spinner /> :
            <div className="row">
                {store.planets.map((item) => (
                    <div key={item.uid} className="card text-bg-warning m-1 " style={{ width: '18rem', transition: 'transform 0.3s ease-in-out' }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                        <img
                            src={`https://starwars-visualguide.com/assets/img/planets/${item.uid}.jpg`}
                            onError={(e) => e.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg'}
                            className="card-img-top"
                            alt={item.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <div className="d-flex justify-content-between">
                                <button className="btn btn-warning me-1"
                                        onClick={() => navigate(`/planets/${item.uid}`)}>Details</button>
                                <button className="btn btn-light btn-outline-danger" onClick={() => actions.addFavorite({name: item.name, type: 'Planet'})} ><i className="far fa-heart"></i></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
    }
        </div>
    );
};