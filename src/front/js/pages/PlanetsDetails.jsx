import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { Spinner } from "../component/Spinner.jsx";


export const PlanetDetails = () => {
    const { store, actions } = useContext(Context)
    const params = useParams()
    console.log(params)

    useEffect(() => {
        actions.getPlanetDetails(params.id)
    })

    return (
        <div className="container">
            <h1 className="text-light">Details</h1>
            {store.planetDetails.name === undefined ? <Spinner /> :
                <>
                    <div className="d-flex items-align-justify">
                        <img
                            src={`https://starwars-visualguide.com/assets/img/planets/${params.id}.jpg`}
                            onError={(e) => e.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg'}
                            className="card-img-top"
                            alt={store.planetDetails.name}
                            style={{ width: '30%', height: '30%', objectFit: 'cover' }} />
                        <div className="ms-2 ">
                            <p className="text-light"><b>Name: </b>{store.planetDetails.name}</p>
                            <p className="text-light"><b>Diameter: </b>{store.planetDetails.diameter}km</p>
                            <p className="text-light"><b>Population: </b> {store.planetDetails.population}</p>
                            <p className="text-light"><b>Terrain: </b> {store.planetDetails.terrain}</p>
                            <p className="text-light"><b>Surface water: </b> {store.planetDetails.surface_water}%</p>
                            <p className="text-light"><b>Climate: </b> {store.planetDetails.climate}</p>
                            <p className="text-light"><b>Orbital period: </b> {store.planetDetails.orbital_period} Local days</p>
                            <p className="text-light"><b>Rotation period: </b> {store.planetDetails.rotation_period} Standard hours</p>
                            <p className="text-light"><b>Gravity: </b> {store.planetDetails.gravity}</p>
                        </div>
                        
                    </div>
                </>
            }
        </div>
    )
}