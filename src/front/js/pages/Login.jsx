import React, { useState, useContext } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";
import yoda from "../../img/Yoda.png";



export const Login = () => {
    const { store, actions } = useContext(Context)
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    // const [ hidePassword, setHidePassword ] = useState(true)
    const navigate = useNavigate()

    const handleEmailChange = (event) => { setEmail(event.target.value); };
    const handlePasswordChange = (event) => { setPassword(event.target.value); };

    const handleSubmit = (event) => {
        event.preventDefault();
        const dataToSend = { email, password }
        console.log(dataToSend)
        actions.login(dataToSend)
        // console.log(data.access_token);
        // Me voy al dashboard
        navigate('/dashboard')
    }


    return (
        <div className="container w-auto ">
            <div className="form-signin w-100 m-auto">
                <h1 className="text-light">Login</h1>
                <form onSubmit={handleSubmit}>
                    <img className="mb-4" src={yoda} alt="" width="72" height="57" />
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                    <div className="form-floating">
                        <input type="email" className="form-control" id="floatingInput" value={email} onChange={handleEmailChange} placeholder="name@example.com" />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" value={password} onChange={handlePasswordChange} placeholder="Password" />
                        <label htmlFor="floatingPassword">Password </label>
                    </div>

                    <div className="form-check text-start my-3">
                        <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
                        <label className="form-check-label text-light" htmlFor="flexCheckDefault">
                            Remember me
                        </label>
                    </div>
                    <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
                    <p className="mt-5 mb-3 text-body-secondary">© 2017–2024</p>
                </form>
            </div>
        </div>
    );
};