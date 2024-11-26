import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { Spinner } from "../component/Spinner.jsx";


export const CharacterDetails = () => {
    const { store, actions } = useContext(Context)
    const params = useParams()
    console.log(params)

    useEffect(() => {
        actions.getCharacterDetails(params.id)
    })


    return (
        <div className="container">
            <h1 className="text-light">Details</h1>
            {store.characterDetails.name === undefined ? <Spinner /> :
                <>
                    <div className="d-flex items-align-justify">
                        <img
                            src={`https://starwars-visualguide.com/assets/img/characters/${params.id}.jpg`}
                            className="card-img-top"
                            alt={store.characterDetails.name}
                            style={{ width: '30%', height: '30%', objectFit: 'cover' }} />
                        <div className="ms-2 ">
                            <p className="text-light"><b>Name: </b>{store.characterDetails.name}</p>
                            <p className="text-light"><b>Height: </b> {store.characterDetails.height}</p>
                            <p className="text-light"><b>Weight: </b> {store.characterDetails.mass}</p>
                            <p className="text-light"><b>Hair color: </b> {store.characterDetails.hair_color}</p>
                            <p className="text-light"><b>Eye color: </b> {store.characterDetails.eye_color}</p>
                            <p className="text-light"><b>Gender: </b> {store.characterDetails.gender}</p>
                            <p className="text-light"><b>Birth year: </b> {store.characterDetails.birth_year}</p>
                        </div>
                        
                    </div>
                </>
            }
        </div>
    )
}