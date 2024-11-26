// 1 Importar el hook useContext
import React, { useContext } from "react";
// 2 Importamos Context desde el archivo appContext.js
import { Context } from "../store/appContext.js";
import { Alert } from "./Alert.jsx";

export const ContextExample = () => {
    // 3 Utilizo: Desestructurando store y el action de Context mediante el useContext
    const { store, actions } = useContext(Context);

    const handleLogin = () => {
        actions.setIsLoged(!store.isLoged);
    }


    return (
        <div className="container text-center">
            {/* 4 Utilizo la sintaxis stor.clave para mostrar el valor */}
            <Alert />
            <p>{store.user}</p>
            <p>{store.cohorte}</p>
            <button className="btn btn-warning" onClick={handleLogin}>
                {store.isLoged ? 'Logout' : 'Login'}
            </button>
        </div>
    )
}