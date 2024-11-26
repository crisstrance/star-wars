import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { Spinner } from "../component/Spinner.jsx";


export const StarshipDetails = () => {
    const { store, actions } = useContext(Context)
    const params = useParams()
    console.log(params)

    useEffect(() => {
        actions.getStarshipDetails(params.id)
    })

    return (
        <div className="container">
            <h1 className="text-light">Details</h1>
            {store.starshipDetails.name === undefined ? <Spinner /> :
                <>
                    <div className="d-flex items-align-justify">
                        <img
                            src={`https://starwars-visualguide.com/assets/img/starships/${params.id}.jpg`}
                            onError={(e) => e.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg'}
                            className="card-img-top"
                            alt={store.starshipDetails.name}
                            style={{ width: '30%', height: '30%', objectFit: 'cover' }} />
                        <div className="ms-2 ">
                            <p className="text-light"><b>Name: </b>{store.starshipDetails.name}</p>
                            <p className="text-light"><b>Model: </b>{store.starshipDetails.model}km</p>
                            <p className="text-light"><b>Starship Class: </b> {store.starshipDetails.starship_class}</p>
                            <p className="text-light"><b>Manufacturer: </b> {store.starshipDetails.manufacturer}</p>
                            <p className="text-light"><b>Cost: </b> {store.starshipDetails.cost_in_credits} Credits</p>
                            <p className="text-light"><b>Length: </b> {store.starshipDetails.length}</p>
                            <p className="text-light"><b>Crew: </b> {store.starshipDetails.orbital_period}</p>
                            <p className="text-light"><b>Cargo capacity: </b> {store.starshipDetails.cargo_capacity}</p>
                            <p className="text-light"><b>Consumables: </b> {store.starshipDetails.consumables}</p>
                        </div>
                        
                    </div>
                </>
            }
        </div>
    )
}